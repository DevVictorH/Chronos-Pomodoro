
import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';


export function Footer() {
    return <footer className={styles.footer}>
        <RouterLink href="/about-pomodoro" aria-label='Entenda como funciona a técnica pomodoro' title='Entenda como funciona a técnica pomodoro'>
            Entenda como funciona a técnica pomodoro
        </RouterLink>
        <RouterLink 
        href="/">Chronos pomodoro &copy; {new Date().getFullYear()}
        </RouterLink>
    </footer>
}