import { Service } from 'react-native-zeroconf';
import { PickAction } from '../utils';
import { ZeroconfAction, ZeroconfActionType } from './constants';

export const startScan = (): PickAction<ZeroconfAction, ZeroconfActionType.scanStart> => ({
    type: ZeroconfActionType.scanStart,
});

export const stopScan = (): PickAction<ZeroconfAction, ZeroconfActionType.scanStop> => ({
    type: ZeroconfActionType.scanStop,
});

export const updateResolvedServices = (service: Service): PickAction<ZeroconfAction, ZeroconfActionType.resolveService> => ({
    type: ZeroconfActionType.resolveService,
    service,
});

export const zeroconfError = (e: Error): PickAction<ZeroconfAction, ZeroconfActionType.error> => ({
    type: ZeroconfActionType.error,
    error: e,
});
