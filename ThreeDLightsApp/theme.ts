export interface Theme {
    text: string;
    bgPrimary: string;
    bgSecondary: string;
}

export const lightTheme: Theme = {
    text: '#000',
    bgPrimary: '#fff',
    bgSecondary: '#eee',
};

export const darkTheme: Theme = {
    text: '#fff',
    bgPrimary: '#000',
    bgSecondary: '#222',
};

export interface ThemeProps {
    theme: Theme;
}

