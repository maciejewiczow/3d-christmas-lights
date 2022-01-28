import Zeroconf from 'react-native-zeroconf';
import { Saga } from 'redux-saga';
import {
    all,
    call,
    put,
    spawn,
    takeEvery,
} from 'redux-saga/effects';
import { startScan } from './devices/actions';
import * as zeroconfWatchers from './devices/sagas';

const spawnAll = (sagasExport: { [key: string]: Saga }) => Object.values(sagasExport).map(saga => spawn(saga));

function* initSaga() {
    yield put(startScan());
}

function* debugWatcher() {
    yield takeEvery('*', action => console.log(JSON.stringify(action, null, 2)));
}

export default function* rootSaga() {
    yield all([
        spawn(debugWatcher),
        ...spawnAll(zeroconfWatchers),
        call(initSaga),
    ]);
}
