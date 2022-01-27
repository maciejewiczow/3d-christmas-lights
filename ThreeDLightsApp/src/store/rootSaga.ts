import Zeroconf from 'react-native-zeroconf';
import { Saga } from 'redux-saga';
import {
    all,
    call,
    put,
    spawn,
    takeEvery,
} from 'redux-saga/effects';
import { INIT_ACTION_TYPE } from './utils';
import * as zeroconfWatchers from './zeroconf/sagas';

const spawnAll = (sagasExport: { [key: string]: Saga }) => Object.values(sagasExport).map(saga => spawn(saga));

function* initSaga() {
    console.log('Init saga ran');
    yield put({ type: INIT_ACTION_TYPE });
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
