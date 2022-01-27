import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from '~/src/store';
import { HomeView, ScanView } from '~/src/views';
import { darkTheme, lightTheme, Theme } from './theme';

export type RootStackParams = {
    Home: undefined;
    Scan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            animation: 'slide_from_right',
                            headerTintColor: (isDarkMode ? darkTheme : lightTheme).text,
                            headerStyle: {
                                backgroundColor: (isDarkMode ? darkTheme : lightTheme).bgSecondary,
                            },
                        }}
                    >
                        <Stack.Screen name="Home" component={HomeView} />
                        <Stack.Screen name="Scan" component={ScanView} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
