import produce from 'immer';
import { Reducer } from 'redux';
import { ZeroconfAction, ZeroconfActionType } from './constants';
import { initialZeroconfState, ZeroconfState } from './store';

export const zeroconfReducer: Reducer<ZeroconfState, ZeroconfAction> = (
    state = initialZeroconfState,
    action,
) => {
    switch (action.type) {
        case ZeroconfActionType.scanStart:
            return produce(state, draft => {
                draft.isScanning = true;
            });

        case ZeroconfActionType.error:
        case ZeroconfActionType.scanStop:
            return produce(state, draft => {
                draft.isScanning = false;
            });

        case ZeroconfActionType.resolveService:
            return produce(state, draft => {
                draft.resolvedServices.push(action.service);
            });

        default:
            return state;
    }
};
