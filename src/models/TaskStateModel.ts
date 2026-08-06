import type { TaskModel } from "./TaskModel"

export type TaskStateModel = {
    tasks: TaskModel[]
    secondsRemaining: number
    formattedSecondsRemaining: string
    activeTask: TaskModel | null
    currentCycle: number
    config: {
        work: number
        shortBreak: number
        longBreak: number
    }
}