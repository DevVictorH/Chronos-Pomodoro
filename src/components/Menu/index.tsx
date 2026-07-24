import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type avaibleThemes = 'light' | 'dark';

export function Menu() {
    const [theme, setTheme] = useState<avaibleThemes>(() => {
        const savedTheme = localStorage.getItem('theme') as avaibleThemes || "dark";
        return savedTheme;
    });

    const nextThemeIcon = {
        dark: <SunIcon />,
        light: <MoonIcon />,
    }

    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        setTheme((prevTheme) => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
            return nextTheme;
        });
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return <div className={styles.menu}>
        <a className={styles.menuLink} href="#" aria-label='Ir para home' title='Ir para home'>
            <HouseIcon/>
        </a>

         <a className={styles.menuLink} href="#" aria-label='Histórico' title='Histórico'>
            <HistoryIcon/>
        </a>

         <a className={styles.menuLink} href="#" aria-label='Configurações' title='Configurações'>
            <SettingsIcon/>
        </a>

         <a className={styles.menuLink} href="#" aria-label='Tema' title='Tema' onClick={handleThemeChange}>
            {nextThemeIcon[theme]}
        </a>
        </div>
}