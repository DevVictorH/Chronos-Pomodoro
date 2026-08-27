import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplates } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";


export function Settings() {

    const { state, dispatch } = useTaskContext();
    const workTimeInputRef = useRef<HTMLInputElement>(null)
    const shortBreakInputRef = useRef<HTMLInputElement>(null)
    const LognBreakInputRef = useRef<HTMLInputElement>(null)

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const work = Number(workTimeInputRef.current?.value);
        const shortBreak = Number(shortBreakInputRef.current?.value);
        const longBreak = Number(LognBreakInputRef.current?.value);

        if (isNaN(work) || isNaN(shortBreak) || isNaN(longBreak)) {
            showMessage.error("Digite apenas números")
            return;
        }

        if (work < 1 || work > 99) {
            showMessage.error("Digite valores entre 1 e 99")
            return
        }
        dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload: {
            work,
            shortBreak,
            longBreak
        }})
        showMessage.dismiss()
        showMessage.success("Configurações salvas")
    }

    return (
        <MainTemplates>

            <Container>
                <Heading>
                    Configurações
                </Heading>

            </Container>
            <Container><p style={{ textAlign: "center" }}>
                Modifique as configurações para tempo de foco, descanso curto e
                descanso longo</p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSettings} action="" className="form">
                    <div className="formRow">
                        <DefaultInput
                            id="work"
                            labelText="Foco"
                            ref={workTimeInputRef}
                            defaultValue={state.config.work}
                            type="number" />
                    </div>
                    <div className="formRow">
                        <DefaultInput
                            id="shortBreak"
                            labelText="Descanso curto"
                            ref={shortBreakInputRef}
                            defaultValue={state.config.shortBreak}
                            type="number" />
                    </div>
                    <div className="formRow">
                        <DefaultInput
                            id="longBreak"
                            labelText="Descanso longo"
                            ref={LognBreakInputRef}
                            defaultValue={state.config.longBreak}
                            type="number" />
                    </div>
                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon />} aria-label="Salvar configurações"
                            title="Salvar configurações" />
                    </div>
                </form>
            </Container>

        </MainTemplates>
    )

}
