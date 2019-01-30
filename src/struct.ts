import { Map, ValueObject } from "immutable"

type Subtract<T, K> = Pick<T, Exclude<keyof T, K>>

type Banned = "get" | "has" | "set" | "merge" | "update" | "delete" | "remove" | "toJS" | "hashCode" | "equals"
    | "unwrap" | "toString"
type Allowed<T> = keyof T extends Banned ? never : T

export class Struct<T extends Object> implements ValueObject {  // TODO implement Record

    //noinspection JSUnusedGlobalSymbols
    /**
     * Symbol to claim that this instance is an immutable Record.
     *
     * TODO can be problematic when not implement Record
     * @see https://github.com/facebook/immutable-js/blob/master/src/predicates/isImmutable.js
     * @see https://github.com/facebook/immutable-js/blob/master/src/predicates/isRecord.js
     */
    readonly "@@__IMMUTABLE_RECORD__@@" = true

    /**
     * Composite store map.
     */
    private readonly store: Map<string, any>

    private constructor(store?: T) {
        this.store = Map(store || {})
    }

    /**
     * Creates new {@code Struct} instance.
     * @param initialValue Initial value
     */
    static of<T>(initialValue?: Allowed<T>): Struct<T> & T {
        return new (class extends Struct<T> {

            constructor(initialValue?: T) {
                super(initialValue)
                if (initialValue) {
                    Object.getOwnPropertyNames(initialValue).forEach(k => {
                        Object.defineProperty(this, k, {
                            enumerable: true,
                            get() {
                                return (initialValue as any)[k]
                            },
                            set(value: any) {
                                throw new Error(`It's not allowed to assign value to the Struct: {key: '${k}', value: '${value}'}`)
                            }
                        })
                    })
                }
            }

        })(initialValue) as Struct<T> & T
    }

    /**
     * Retrieves the value associated with the key.
     * @param key Key
     * @return Value of the key
     * @throws When the key does not exist
     */
    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // key check for JavaScript
        if (!this.store.has(key)) {
            throw new Error(`No such element for the key '${key}'.`)  // TODO should return undefined?
        }

        return this.store.get(key as string) as any
    }

    // orElse

    /**
     * Checks if this store has the key.
     * @param key The key to check
     * @return true if the key exists
     */
    has(key: string): boolean {
        return this.store.has(key)
    }

    /**
     * Returns the immutable copy of this store with given key and value.
     * Replacing the value that is already exists.
     * @param key Key
     * @param value Value
     * @return Copy with the pair
     */
    set<K extends string, V, U extends { [_ in K]: V }>(key: K, value: V): Struct<Subtract<T, K> & U> {
        return new Struct(this.store.set(key, value)) as any
    }

    merge<U extends { [key: string]: any }>(other: U | Struct<U>): Struct<Subtract<T, keyof U> & U> {
        if (other instanceof Struct) {
            return new Struct(this.store.merge(other.store)) as any

        } else {
            return new Struct(this.store.merge(other)) as any
        }
    }

    update<K extends keyof T, V>(
        key: K,
        updater: (value: T[K]) => V
    ): Struct<Subtract<T, K> & { [_ in K]: V }> {
        return new Struct(this.store.update(key as string, updater)) as any
    }

    /**
     * Returns the immutable copy of this store without the given key.
     * @param key Key to eliminate
     */
    delete<K extends keyof T>(key: K): Struct<Subtract<T, K>> {
        return new Struct(this.store.remove(key as string)) as any
    }

    /**
     * Alias for {@link Struct#delete}
     */
    remove<K extends keyof T>(key: K): Struct<Subtract<T, K>> {
        return this.delete(key)
    }

    toJS(): T {
        return this.store.toJS() as T
    }

    hashCode(): number {
        return this.store.hashCode()
    }

    equals(other: any): boolean {
        return this === other || (other instanceof Struct && this.store.equals(other.store))
    }

    /**
     * Returns the internal Map used by this instance.
     * @return Map
     */
    unwrap<T>(): Map<string, T> {
        return this.store
    }

    toString(): string {
        // TODO
        return ""
    }

    * [Symbol.iterator](): IterableIterator<[string, any]> {
        for (const each of this.store.entries()) {
            yield each
        }
    }
}
