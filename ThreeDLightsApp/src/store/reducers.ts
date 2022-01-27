import { combineReducers } from 'redux';

import { AppState } from './constants';
import { zeroconfReducer } from './zeroconf/reducers';

const rootReducer = combineReducers<AppState>({
    zeroconf: zeroconfReducer,
});

export default rootReducer;
