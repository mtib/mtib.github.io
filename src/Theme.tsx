import { CSSObject, Global } from '@emotion/react';
import * as React from 'react';

export enum Mode {
    Dark,
    Light,
}

type ThemeContextType = {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    toggleMode: () => void;
};

const RootStyles = {
    [Mode.Dark]: {
        '--bs-body-bg': '#000',
        '--bs-body-bg-rgb': '0,0,0',
        '--bs-body-color': '#fff',
        '--bs-body-color-rgb': '255,255,255',
        '--bs-link-color': '#c8e',
        '--bs-link-color-rgb': '204,136,238',
        '--bs-link-hover-color': '#eaf',
        '--bs-link-hover-color-rgb': '238,170,255',
    },
    [Mode.Light]: {
        '--bs-link-color': '#917',
        '--bs-link-color-rgb': '153 17 119',
        '--bs-link-hover-color': '#615',
        '--bs-link-hover-color-rgb': '102 17 8',
    },
} as const satisfies Record<Mode, CSSObject>;

const isThemeContextType = (theme: object): theme is ThemeContextType => 'mode' in theme
    && theme.mode !== null;


const ThemeContext = React.createContext<ThemeContextType | null>(null);

const Theme: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
    const [mode, setMode] = React.useState<Mode | null>(null);

    const value = React.useMemo(() => ({
        mode,
        setMode,
        toggleMode: () => { setMode(currentMode => currentMode === Mode.Light ? Mode.Dark : Mode.Light); },
    }), [mode]);

    React.useEffect(() => {
        const storedState = localStorage.getItem('theme');
        if (storedState === null || storedState === 'dark') {
            setMode(Mode.Dark);
        } else {
            setMode(Mode.Light);
        }
    }, []);

    React.useEffect(() => {
        switch (mode) {
            case Mode.Dark:
                localStorage.setItem('theme', 'dark');
                break;
            case Mode.Light:
                localStorage.setItem('theme', 'light');
                break;
        }
    }, [mode]);

    if (!isThemeContextType(value)) {
        return null;
    }

    return (
        <ThemeContext.Provider value={value}>
            <Global
                styles={{
                    'a,a:hover': {
                        textDecoration: 'none',
                    },
                    ':root': RootStyles[value.mode]
                }}
            />
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => React.useContext(ThemeContext);

export default Theme;
