import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { MainTemplates } from "../../templates/MainTemplate";
import styles from "./styles.module.css"

export function History() {
    return (
        <MainTemplates>

            <Container>
                <Heading>
                    <span>History</span>
                    <span className={styles.buttonContainer}>
                        <DefaultButton icon={<TrashIcon />} color="red"
                            aria-label="Apagar todo o historico"
                            title="Apagar historico" />
                    </span>
                </Heading>
            </Container>

            <Container>
                <div className={styles.responsiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Tarefa</th>
                                <th>Duração</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>

                        <tbody>
                            {Array.from({ length: 20 }).map(() => {
                                return (
                                    <tr>
                                        <td>Estudar</td>
                                        <td>25 min</td>
                                        <td>19/08/2026 22:00</td>
                                        <td>Completa</td>
                                        <td>Foco</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </Container>

        </MainTemplates>
    )

}
