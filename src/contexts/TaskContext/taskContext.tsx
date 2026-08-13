import { createContext } from "react"
import type { TaskStateModel } from "../../models/TaskStateModel"
import { initialTaskState } from "./initialTaskState"
import type { TaskActionModel } from "./taskActions"

type TaskContextProps = {
  state: TaskStateModel
  dispatch: React.Dispatch<TaskActionModel>
}

const initiaContextValue = {
  state: initialTaskState,
  dispatch: () => {}
}

export const TaskContext = createContext<TaskContextProps>(initiaContextValue);



