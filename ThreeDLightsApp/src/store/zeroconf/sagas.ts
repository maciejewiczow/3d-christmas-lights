import Zeroconf from 'react-native-zeroconf';
import { buffers, EventChannel, eventChannel } from 'redux-saga';
import {
    apply,
    call,
    fork,
    put,
    take,
    takeLatest,
} from 'redux-saga/effects';
import { INIT_ACTION_TYPE } from '../utils';
import { stopScan, updateResolvedServices, zeroconfError } from './actions';
import { ZeroconfAction, ZeroconfActionType } from './constants';

const serviceNameRegex = /^3Dlights\d{4}/;

const subscribeZeroconf = (zeroconf: Zeroconf) => (
    eventChannel<ZeroconfAction>(
        emit => {
            zeroconf.on('resolved', s => {
                console.log(s);
                emit(updateResolvedServices(s));
            });
            zeroconf.on('error', e => emit(zeroconfError(e)));

            return () => {
                zeroconf.stop();
                emit(stopScan());
            };
        },
        buffers.expanding(),
    )
);

export function* initWatcher() {
    yield takeLatest(INIT_ACTION_TYPE, devicesWorker);
}

function* zeroconfActionFilter(channel: EventChannel<ZeroconfAction>) {
    while (true) {
        const action: ZeroconfAction = yield take(channel);

        if (action.type !== ZeroconfActionType.resolveService || serviceNameRegex.test(action.service.name))
            yield put(action);
    }
}

function* devicesWorker() {
    /*
    1. start zeroconf scan
    2. wait for device resolved action
    3. stop scan
    */
    const zeroconf = new Zeroconf();

    const channel: ReturnType<typeof subscribeZeroconf> = yield call(subscribeZeroconf, zeroconf);

    yield fork(zeroconfActionFilter, channel);
    zeroconf.scan();
    yield take(ZeroconfActionType.resolveService);
    zeroconf.stop();
}
