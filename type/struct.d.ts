import { Map, ValueObject } from "immutable";
declare type Extract<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare class Struct<T extends Object> implements ValueObject {
    /**
     * Symbol to claim that this instance is an immutable Record.
     *
     * TODO can be problematic when not implement Record
     * @see https://github.com/facebook/immutable-js/blob/master/src/predicates/isImmutable.js
     * @see https://github.com/facebook/immutable-js/blob/master/src/predicates/isRecord.js
     */
    readonly "@@__IMMUTABLE_RECORD__@@" = true;
    /**
     * Composite store map.
     */
    private readonly store;
    private constructor();
    /**
     * Creates new {@code Struct} instance.
     * @param initialValue Initial value
     */
    static of<T>(initialValue?: T): Struct<T>;
    get<K extends keyof T>(key: K): T[K];
    has(key: string): boolean;
    set<K extends string, V, U extends {
        [_ in K]: V;
    }>(key: K, value: V): Struct<Extract<T, K> & U>;
    merge<U extends {
        [key: string]: any;
    }>(other: U | Struct<U>): Struct<Extract<T, keyof U> & U>;
    update<K extends keyof T, V>(key: K, updater: (value: T[K]) => V): Struct<Extract<T, K> & {
        [_ in K]: V;
    }>;
    delete<K extends keyof T>(key: K): Struct<Extract<T, K>>;
    remove<K extends keyof T>(key: K): Struct<Extract<T, K>>;
    toJS(): T;
    hashCode(): number;
    equals(other: any): boolean;
    unwrap<T>(): Map<string, T>;
    toString(): string;
    [Symbol.iterator](): IterableIterator<[keyof T, T[keyof T]]>;
}
export {};
