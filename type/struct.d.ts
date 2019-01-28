import { Map, ValueObject } from "immutable";
export declare class Struct<T> implements ValueObject {
    /**
     * Symbol to claim that this instance is an immutable Collection.
     *
     * TODO can be problematic when not implement Collection
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
    }>(key: K, value: V): Struct<Pick<T, Exclude<keyof T, K>> & U>;
    merge<U extends {
        [key: string]: any;
    }>(other: U | Struct<U>): Struct<Pick<T, Exclude<keyof T, keyof U>> & U>;
    update<K extends keyof T, V>(key: K, updater: (value: T[K]) => V): Struct<Pick<T, Exclude<keyof T, K>> & {
        [_ in K]: V;
    }>;
    delete<K extends keyof T>(key: K): Struct<Pick<T, Exclude<keyof T, K>>>;
    remove<K extends keyof T>(key: K): Struct<Pick<T, Exclude<keyof T, K>>>;
    toJS(): T;
    hashCode(): number;
    equals(other: any): boolean;
    unwrap<T>(): Map<string, T>;
}
