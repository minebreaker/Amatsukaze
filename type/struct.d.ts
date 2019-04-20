import { Map, ValueObject } from "immutable";
declare type Subtract<T, K> = Pick<T, Exclude<keyof T, K>>;
declare type Banned = "get" | "has" | "set" | "merge" | "update" | "delete" | "remove" | "toJS" | "hashCode" | "equals" | "unwrap" | "toString";
declare type Allowed<T> = keyof T extends Banned ? never : T;
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
    static of<T>(initialValue?: Allowed<T>): Struct<T> & T;
    /**
     * Retrieves the value associated with the key.
     * @param key Key
     * @return Value of the key
     * @throws When the key does not exist
     */
    get<K extends keyof T>(key: K): T[K];
    /**
     * Checks if this store has the key.
     * @param key The key to check
     * @return true if the key exists
     */
    has(key: string): boolean;
    /**
     * Returns the immutable copy of this store with given key and value.
     * Replacing the value that is already exists.
     * @param key Key
     * @param value Value
     * @return Copy with the pair
     */
    set<K extends string, V, U extends {
        [_ in K]: V;
    }>(key: K, value: V): Struct<Subtract<T, K> & U>;
    merge<U extends {
        [key: string]: any;
    }>(other: U | Struct<U>): Struct<Subtract<T, keyof U> & U>;
    update<K extends keyof T, V>(key: K, updater: (value: T[K]) => V): Struct<Subtract<T, K> & {
        [_ in K]: V;
    }>;
    /**
     * Returns the immutable copy of this store without the given key.
     * @param key Key to eliminate
     */
    delete<K extends keyof T>(key: K): Struct<Subtract<T, K>>;
    /**
     * Alias for {@link Struct#delete}
     */
    remove<K extends keyof T>(key: K): Struct<Subtract<T, K>>;
    toJS(): T;
    hashCode(): number;
    equals(other: any): boolean;
    /**
     * Returns the internal Map used by this instance.
     * @return Map
     */
    unwrap<T>(): Map<string, T>;
    toString(): string;
    [Symbol.iterator](): IterableIterator<[string, any]>;
}
export {};
