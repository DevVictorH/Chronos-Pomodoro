import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useState } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { getNextCycle } from "../../utils/getNextCycle";

export function MainForm() {

  const { state, setState } = useTaskContext()
  const [taskName, setTaskName] = useState<string>('');

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleStartNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (taskName.trim() === '') {
      alert('Por favor, digite o nome da tarefa.')
      return
    }

    console.log('Tarefa iniciada:', taskName);

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    }

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => ({
      ...prevState,
      activeTask: newTask,
      currentCycle: nextCycle,
      secondsRemaining,
      formattedSecondsRemaining: "00:00",
      tasks: [...prevState.tasks, newTask],
    }))

  }

  return (
    <form onSubmit={handleStartNewTask} className="form" action="">
      <div className='formRow'>
        <DefaultInput
          type='text' id='meuInput' labelText='Task' placeholder='Digite algo'
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />

      </div>

      <div className='formRow'>
        <p>Proximo intervalo</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>

    </form>
  )
}