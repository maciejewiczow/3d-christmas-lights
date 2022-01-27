import { Action } from 'redux';

export type PickAction<A extends Action<string>, T extends A['type']> = Extract<A, { type: T }>;

export const objectHasOwnProperty = (object: unknown, propName: string | number | symbol) => (
    ({}).hasOwnProperty.call(object, propName)
);

export type AsyncRetT<T> = T extends ((...args: any[]) => Promise<infer R>) ? R : never;

export const INIT_ACTION_TYPE = 'initalize';
