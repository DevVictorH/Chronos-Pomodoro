import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplates } from "../../templates/MainTemplate";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";


export function Settings() {

    const {state} = useTaskContext();
    const workTimeInputRef = useRef<HTMLInputElement>(null)
    const shortBreakInputRef = useRef<HTMLInputElement>(null)
    const LognBreakInputRef = useRef<HTMLInputElement>(null)

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const work = workTimeInputRef.current?.value;
        const shortBreak = shortBreakInputRef.current?.value;
        const longBreak = LognBreakInputRef.current?.value;
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
                        defaultValue={state.config.work}/>
                    </div>
                    <div className="formRow">
                        <DefaultInput 
                        id="shortBreak" 
                        labelText="Descanso curto" 
                        ref={shortBreakInputRef}
                        defaultValue={state.config.shortBreak}/>
                    </div>
                    <div className="formRow">
                        <DefaultInput 
                        id="longBreak" 
                        labelText="Descanso longo" 
                        ref={LognBreakInputRef}
                        defaultValue={state.config.longBreak}/>
                    </div>
                    <div className="formRow">
                        <DefaultButton icon={<SaveIcon/>} aria-label="Salvar configurações"
                        title="Salvar configurações"/>
                    </div>
                </form>
            </Container>

        </MainTemplates>
    )

}
