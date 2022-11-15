import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from '~/src/store';
import { HomeView, ScanView } from '~/src/views';
import { darkTheme, lightTheme } from './theme';
import { HeaderRight as HomeHeaderRight, HeaderTitle as HomeHeaderTitle } from './src/views/HomeView/HomeView';

export type RootStackParams = {
    Home: undefined;
    Scan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            animation: 'slide_from_right',
                            headerTintColor: theme.text,
                            headerStyle: {
                                backgroundColor: theme.bgSecondary,
                            },
                        }}
                    >
                        <Stack.Screen
                            name="Home"
                            component={HomeView}
                            options={{
                                headerTitle: HomeHeaderTitle,
                                headerRight: HomeHeaderRight,
                            }}
                        />
                        <Stack.Screen name="Scan" component={ScanView} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
