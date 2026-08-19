import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";

type TaskContextProviderProps = {
    children: React.ReactNode
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);
    let playBeep = useRef<() => void | null>(null);

    const worker = TimerWorkerManager.getInstance();
    const prevActiveTaskId = useRef<string | null>(null);

    worker.onmessage(e => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
            if(playBeep.current) {
                playBeep.current();
                playBeep.current = null;
            }
            dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        } else {
            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds }
            });
        }
    });

    useEffect(() => {

        const prevId = prevActiveTaskId.current;
        const currentId = state.activeTask?.id ?? null;

        if (prevId && !currentId) {
            const prevTask = state.tasks.find(t => t.id === prevId);
            if (prevTask && prevTask.interruptDate) {
                console.log('Task was interrupted — terminating worker');
                try { worker.terminate(); } catch (err) { console.error('error terminating worker', err); }
            }
        }

        prevActiveTaskId.current = currentId;

        if (!state.activeTask) {
            worker.terminate();
            return;
        }
        worker.postMessage(state);
    }, [worker, state]);

    useEffect(() => {
        if(state.activeTask && playBeep.current === null) {
            playBeep.current = loadBeep();
        } else{
                playBeep.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}
