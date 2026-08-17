import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { getNextCycle } from "../../utils/getNextCycle";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";

export function MainForm() {

  const { state, dispatch } = useTaskContext()
  const [taskName, setTaskName] = useState<string>('');

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

  function handleStartNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (taskName.trim() === '') {
      alert('Por favor, digite o nome da tarefa.')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handleInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleStartNewTask} className="form" action="">
      <div className='formRow'>
        <DefaultInput
          type='text' id='meuInput' labelText='Task' placeholder='Digite algo'
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          disabled={!!state.activeTask}
        />

      </div>

      <div className='formRow'>
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            arial-label='Iniciar tarefa'
            title="Iniciar nova tarefa"
            type='submit'
            icon={<PlayCircleIcon />}
            key="startButton"
          />
        ) : (
          <DefaultButton
            arial-label='Interromper tarefa'
            title="Interromper tarefa"
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleInterruptTask}
            key="stopButton"
          />
        )}

      </div>

    </form>
  )
}