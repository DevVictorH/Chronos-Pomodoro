import './styles/theme.css'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { TaskContextProvider } from './contexts/TaskContext/taskContextProvider'
import { MessagesContainer } from './components/MessagesContainer'
import { MainRouter } from './routers/MainRouters'


export function App() {

  return (
    <TaskContextProvider>

      <MessagesContainer>
      <MainRouter />
      </MessagesContainer>

    </TaskContextProvider>
  )
}
