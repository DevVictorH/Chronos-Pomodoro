import './styles/theme.css'
import './styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { Home } from './pages/Home'
import { TaskContextProvider } from './contexts/TaskContext/taskContextProvider'
import { MessagesContainer } from './components/MessagesContainer'


export function App() {

  return (
    <TaskContextProvider>

      <MessagesContainer>
        <Home />
      </MessagesContainer>

    </TaskContextProvider>
  )
}
