import { useEffect } from "react";
import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { MainTemplates } from "../../templates/MainTemplate";


export function Home() {
    useEffect(() => {
        document.title = "Chronos Pomodoro"
    }, [])

    return (
        <MainTemplates>

            <Container>
                <CountDown />
            </Container>

            <Container>
                <MainForm />
            </Container>

        </MainTemplates>
    )

}
