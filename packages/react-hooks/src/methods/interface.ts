import { Draft } from 'immer';

export type NativeReducers<S> = Record<string, (state: S, ...args: unknown[]) => S>;

export type ImmerReducers<S> = Record<string, (state: Draft<S>, ...args: unknown[]) => S | void>;

type Strip<T> = T extends (state: unknown, ...args: infer P) => unknown ? (...args: P) => void : never;

export type Methods<S, R extends NativeReducers<S> | ImmerReducers<S>> = {
  [K in keyof R]: Strip<R[K]>;
};
