import type { TaskModel } from "../models/TaskModel";

export function getTaskStatus(task:TaskModel, activeTask: TaskModel | null){

    if(task.completeDate) return "Completo";
    if(task.interruptDate) return "Interrompido";
    if(task.id === activeTask?.id) return "Em progresso";
    return "Abandonado"

}