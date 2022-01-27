import { Service } from 'react-native-zeroconf';

export enum ZeroconfActionType {
    scanStart = 'zeroconf/ScanStarted',
    scanStop = 'zeroconf/ScanStopped',
    resolveService = 'zeroconf/ServiceResolved',
    error = 'zeroconf/Error',
}

export type ZeroconfAction = {
    type: ZeroconfActionType.scanStart;
} | {
    type: ZeroconfActionType.scanStop;
} | {
    type: ZeroconfActionType.resolveService;
    service: Service;
} | {
    type: ZeroconfActionType.error;
    error: Error;
};
