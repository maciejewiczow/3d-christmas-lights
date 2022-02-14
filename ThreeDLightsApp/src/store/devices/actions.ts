import { PickAction } from '../utils';
import { DevicesAction, DevicesActionType } from './constants';
import { LightsDevice } from './store';

export const startScan = (): PickAction<DevicesAction, DevicesActionType.scanStart> => ({
    type: DevicesActionType.scanStart,
});

export const stopScan = (): PickAction<DevicesAction, DevicesActionType.scanStop> => ({
    type: DevicesActionType.scanStop,
});

export const updateResolvedDevices = (device: LightsDevice): PickAction<DevicesAction, DevicesActionType.resolveService> => ({
    type: DevicesActionType.resolveService,
    device,
});

export const updateDevice = (device: Partial<LightsDevice>): PickAction<DevicesAction, DevicesActionType.updateDevice> => ({
    type: DevicesActionType.updateDevice,
    device,
    deviceId: 0,
});

export const zeroconfError = (e: Error): PickAction<DevicesAction, DevicesActionType.error> => ({
    type: DevicesActionType.error,
    error: e,
});

export const setEffect = (effectName: string): PickAction<DevicesAction, DevicesActionType.setEffect> => ({
    type: DevicesActionType.setEffect,
    deviceId: 0,
    effectName,
});
