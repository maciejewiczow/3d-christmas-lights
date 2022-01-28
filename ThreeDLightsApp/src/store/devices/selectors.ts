import { AppState } from '../constants';

export const effects = (deviceId = 0) => (state: AppState) => state.devices.resolved.length > deviceId && state.devices.resolved[deviceId].effects;

export const currentEffect = (deviceId = 0) => (state: AppState) => state.devices.resolved.length > deviceId && state.devices.resolved[deviceId].currentEffect;

export const device = (deviceId: number) => (state: AppState) => state.devices.resolved.length > deviceId && state.devices.resolved[deviceId];
