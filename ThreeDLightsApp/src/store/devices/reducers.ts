import produce from 'immer';
import { Reducer } from 'redux';
import { DevicesAction, DevicesActionType } from './constants';
import { initialDevicesState, DevicesState } from './store';

export const devicesReducer: Reducer<DevicesState, DevicesAction> = (
    state = initialDevicesState,
    action,
) => {
    switch (action.type) {
        case DevicesActionType.scanStart:
            return produce(state, draft => {
                draft.isScanning = true;
            });

        case DevicesActionType.error:
        case DevicesActionType.scanStop:
            return produce(state, draft => {
                draft.isScanning = false;
            });

        case DevicesActionType.resolveService:
            return produce(state, draft => {
                draft.resolved.push(action.device);
            });

        case DevicesActionType.updateDevice:
            return produce(state, draft => {
                Object.assign(draft.resolved[action.deviceId], action.device);
            });

        default:
            return state;
    }
};
