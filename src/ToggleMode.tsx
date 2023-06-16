import * as React from 'react';
import { Mode, useTheme } from './Theme';

const ToggleMode: React.FC = () => {
    const theme = useTheme();

    if (theme === null) {
        return null;
    }

    return (
        <a role="button" onClick={theme.toggleMode}>
            {theme.mode === Mode.Dark && 'Light Mode'}
            {theme.mode === Mode.Light && 'Dark Mode'}
        </a>
    )
};

export default ToggleMode;
