import { Service } from 'react-native-zeroconf';

export interface ZeroconfState {
    isScanning: boolean;
    resolvedServices: Service[];
}

export const initialZeroconfState: ZeroconfState = {
    isScanning: false,
    resolvedServices: [],
};
