import { createContext, useContext, useEffect, useMemo, useState } from "react";


export type SelectedTheme = 'light' | 'dark' | 'system';
export type CurrentTheme = 'light' | 'dark';

interface Theme {
    selected: SelectedTheme,
    current: CurrentTheme,
    setTheme: React.Dispatch<React.SetStateAction<SelectedTheme>>;
}

const ThemeContext = createContext<Theme| null>(null);
export const useTheme = () => useContext(ThemeContext)!;

function ThemeProvider({children}: {children: React.ReactNode}) {
    const isSelectedTheme = (value: any): value is SelectedTheme => {
        return value === 'light' || value === 'dark' || value === 'system';
    };


    const [current, setCurrent] = useState<CurrentTheme>('light');
    const [selected, setSelected] = useState<SelectedTheme>(() => { 
        if (typeof window !== 'undefined') {
            const value = localStorage.getItem('theme');
            if (isSelectedTheme(value)) return value;
        }
        return 'light';
    });

    useEffect(() => {
        if (selected === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setCurrent(isDark ? 'dark' : 'light');
        } else {
            setCurrent(selected);
        }
        document.documentElement.className = current;
        localStorage.setItem('theme', selected);
    }, [selected, current]);

    const value = useMemo<Theme>(() => ({selected, current, setTheme: setSelected}), [selected, current])

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider;
