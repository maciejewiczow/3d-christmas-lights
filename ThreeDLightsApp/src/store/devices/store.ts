import { Service } from 'react-native-zeroconf';

export interface LightsDevice extends Service {
    effects: string[];
    currentEffect: string;
}

export interface DevicesState {
    isScanning: boolean;
    resolved: LightsDevice[];
}

export const initialDevicesState: DevicesState = {
    isScanning: false,
    resolved: [],
};
