import { LightsDevice } from './store';

export enum DevicesActionType {
    scanStart = 'devices/ScanStarted',
    scanStop = 'devices/ScanStopped',
    resolveService = 'devices/ServiceResolved',
    error = 'devices/ScanError',
    setEffect = 'devices/SetEffect',
    updateDevice = 'devices/UpdateDevice',
}

export type DevicesAction = {
    type: DevicesActionType.scanStart;
} | {
    type: DevicesActionType.scanStop;
} | {
    type: DevicesActionType.resolveService;
    device: LightsDevice;
} | {
    type: DevicesActionType.error;
    error: Error;
} | {
    type: DevicesActionType.setEffect;
    effectName: string;
    deviceId: 0; // for future use with multiple devices
} | {
    type: DevicesActionType.updateDevice;
    device: Partial<LightsDevice>;
    deviceId: 0;
};
