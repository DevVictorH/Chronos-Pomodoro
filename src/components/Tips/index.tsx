import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips() {

    const { state } = useTaskContext()

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const tipsForWhenActiveTask = {
        work: <span>Foque por {state.config.work} minutos</span>,
        shortBreak: <span>descanse por {state.config.shortBreak} minutos</span>,
        longBreak: <span>descanso longo</span>
    }

    const tipsForWhenNoActiveTask = {
        work: <span>Proximo ciclo é de {state.config.work} minutos</span>,
        shortBreak: <span>Proximo descanso é de {state.config.shortBreak} minutos</span>,
        longBreak: <span>Proximo ciclo é de descanso longo</span>
    }

    return (
        <>
            {state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
            {!state.activeTask && tipsForWhenNoActiveTask[nextCycleType]}
        </>
    )
}

