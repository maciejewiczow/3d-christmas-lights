import { combineReducers } from 'redux';

import { AppState } from './constants';
import { devicesReducer } from './devices/reducers';

const rootReducer = combineReducers<AppState>({
    devices: devicesReducer,
});

export default rootReducer;
