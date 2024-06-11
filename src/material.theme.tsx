export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark'
}

export const parseStringToThemeMode = (theme: string): ThemeMode => {
    switch (theme) {
        case 'light':
            return ThemeMode.LIGHT
        case 'dark':
            return ThemeMode.DARK
    }
    return ThemeMode.LIGHT
}

const DEFAULT_THEME: any = {
    spacing: 10,
    palette: {
        primary: { main: '#454899' },
        secondary: { main: '#007bff' },
        red: { main: '#FF0000' }
    },
    typography: {
        fontFamily: 'Roboto',
        fontSize: window.screen.width <= 1366 ? 12 : 14
    }
}

const DARK_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,
        mode: 'dark'
    }
}

const LIGHT_THEME: any = {
    ...DEFAULT_THEME,
    palette: {
        ...DEFAULT_THEME.palette,
        mode: 'light'
    }
}

const CONFIG_THEME = {
    light: LIGHT_THEME,
    dark: DARK_THEME
}

export default CONFIG_THEME
