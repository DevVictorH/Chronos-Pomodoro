import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplates } from "../../templates/MainTemplate";
import styles from "./styles.module.css"
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { useEffect, useState } from "react";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { showMessage } from "../../adapters/showMessage";

export function History() {

    useEffect(() => {
        document.title = "Histórico | Chronos Pomodoro"
    }, [])

    const { state, dispatch } = useTaskContext();
    const hasTasks = state.tasks.length > 0;
    const [confirmClearHistory, setConfirmClearHistory] = useState(false);
    const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(
        () => {
            return {
                tasks: sortTasks({ tasks: state.tasks }),
                field: 'startDate',
                direction: 'desc'
            }
        });

    useEffect(() => {
        setSortTasksOptions(prevState => ({
            ...prevState,
            tasks: sortTasks({
                tasks: state.tasks,
                field: prevState.field,
                direction: prevState.direction
            })
        }))
    }, [state.tasks])

    useEffect(() => {
        if (!confirmClearHistory) return
        setConfirmClearHistory(false)

        dispatch({type: TaskActionTypes.RESET_STATE})
    }, [confirmClearHistory])

    useEffect(() => {
        return () => {
            showMessage.dismiss();
        }
    }, [])

    function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
        const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc'

        setSortTasksOptions({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTasksOptions.tasks,
                field,
            }),
            direction: newDirection,
            field,
        })
    }

    function handleResetHistory() {
        showMessage.dismiss()
        showMessage.confirm("Tem certeza que deseja apagar o histórico?",
            confirmation => {
                setConfirmClearHistory(confirmation);
            })
        }       
        return (
            <MainTemplates>
                <Container>
                    <Heading>
                        <span>History</span>
                        {hasTasks && (
                            <span className={styles.buttonContainer}>
                                <DefaultButton icon={<TrashIcon />} color="red"
                                    aria-label="Apagar todo o historico"
                                    title="Apagar historico"
                                    onClick={handleResetHistory} />
                            </span>
                        )}
                    </Heading>
                </Container>

                <Container>
                    {hasTasks && (
                        <div className={styles.responsiveTable}>
                            <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSortTasks({ field: 'name' })}
                                            className={styles.thSort}>Tarefa ↕</th>
                                        <th onClick={() => handleSortTasks({ field: 'duration' })}
                                            className={styles.thSort}>Duração ↕</th>
                                        <th onClick={() => handleSortTasks({ field: 'startDate' })}
                                            className={styles.thSort}>Data ↕</th>
                                        <th>Status</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {sortTasksOptions.tasks.map(task => {
                                        const taskTypeMap = {
                                            work: "Foco",
                                            shortBreak: "Descanso curto",
                                            longBreak: "Descanso longo"
                                        }
                                        return (
                                            <tr key={task.id}>
                                                <td>{task.name}</td>
                                                <td>{task.duration}</td>
                                                <td>{formatDate(task.startDate)}</td>
                                                <td>{getTaskStatus(task, state.activeTask)}</td>
                                                <td>{taskTypeMap[task.type]}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                    {!hasTasks && (
                        <p style={{ textAlign: "center", fontWeight: "bold" }}>Ainda não existem tarefas criadas</p>
                    )}
                </Container>
            </MainTemplates>
        )
    
}
