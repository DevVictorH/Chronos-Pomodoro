import './styles/theme.css'
import './styles/global.css'
import { Home } from './pages/Home'
import { TaskContextProvider } from './contexts/TaskContext/taskContextProvider'


export function App() {

  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  )
}
