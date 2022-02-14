import axios, { AxiosResponse } from 'axios';
import Zeroconf, { Service } from 'react-native-zeroconf';
import { buffers, EventChannel, eventChannel } from 'redux-saga';
import {
    apply,
    call,
    delay,
    fork,
    put,
    select,
    take,
    takeLatest,
} from 'redux-saga/effects';
import { PickAction } from '../utils';
import { stopScan, updateDevice, updateResolvedDevices, zeroconfError } from './actions';
import { DevicesAction, DevicesActionType } from './constants';
import { device } from './selectors';
import { LightsDevice } from './store';

const serviceNameRegex = /^3Dlights\d{4}/;

const subscribeZeroconf = (zeroconf: Zeroconf) => (
    eventChannel<DevicesAction | Service>(
        emit => {
            zeroconf.on('resolved', s => {
                console.log(s);
                emit(s);
            });
            zeroconf.on('error', e => emit(zeroconfError(e)));

            return () => {
                zeroconf.stop();
                zeroconf.removeAllListeners();
                emit(stopScan());
            };
        },
        buffers.expanding(),
    )
);

export function* zeroconfScanWatcher() {
    yield takeLatest(DevicesActionType.scanStart, devicesWorker);
}

function* zeroconfActionWorker(channel: ReturnType<typeof subscribeZeroconf>) {
    while (true) {
        const actionOrService: DevicesAction | Service = yield take(channel);

        if ('type' in actionOrService) {
            yield put(actionOrService);
        } else if (serviceNameRegex.test(actionOrService.name)) {
            try {
                const effectsRes: AxiosResponse<string[]> = yield call(
                    axios.get,
                    `http://${actionOrService.host}:${actionOrService.port}/effects`,
                    { timeout: 5000 },
                );

                // TODO: check runtime response type

                const currentEffectRes: AxiosResponse<string> = yield call(
                    axios.get,
                    `http://${actionOrService.host}:${actionOrService.port}/effects/current`,
                );

                yield put(updateResolvedDevices({
                    ...actionOrService,
                    effects: effectsRes.data,
                    currentEffect: currentEffectRes.data,
                }));
            } catch (e) {
                console.log(e);
            }
        }
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

    yield fork(zeroconfActionWorker, channel);
    // apply gives an error with zeroconf
    zeroconf.scan();
    yield take(DevicesActionType.resolveService);
    channel.close();
}

export function* setEffectWatcher() {
    yield takeLatest(DevicesActionType.setEffect, setEffectWorker);
}

function* setEffectWorker(action: PickAction<DevicesAction, DevicesActionType.setEffect>) {
    const dev: LightsDevice | undefined = yield select(device(action.deviceId));

    if (dev) {
        console.log({ effect: action.effectName });
        yield call(
            axios.put,
            `http://${dev.host}:${dev.port}/effects`,
            { effect: action.effectName },
        );

        yield delay(500);
        const currentEffectRes: AxiosResponse<string> = yield call(
            axios.get,
            `http://${dev.host}:${dev.port}/effects/current`,
        );

        yield put(updateDevice({ currentEffect: currentEffectRes.data }));
    }
}
