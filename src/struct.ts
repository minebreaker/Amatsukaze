import { Map, ValueObject } from "immutable"

export class Struct<T> implements ValueObject {  // TODO should extend Collection

    //noinspection JSUnusedGlobalSymbols
    /**
     * Symbol to claim that this instance is an immutable Collection.
     *
     * TODO can be problematic when not implement Collection
     * @see https://github.com/facebook/immutable-js/blob/master/src/predicates/isImmutable.js
     * @see https://github.com/facebook/immutable-js/blob/master/src/predicates/isCollection.js
     */
    readonly "@@__IMMUTABLE_ITERABLE__@@" = true

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
    static of<T>(initialValue?: T): Struct<T> {
        return new Struct(initialValue)
    }

    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // key check for JavaScript
        if (!this.store.has(key)) {
            throw new Error(`No such element for the key '${key}'.`)  // TODO should return undefined?
        }

        return this.store.get(key as string) as any
    }

    // orElse

    has(key: string): boolean {
        return this.store.has(key)
    }

    set<K extends string, V, U extends { [_ in K]: V }>(key: K, value: V): Struct<T & U> {
        return new Struct(this.store.set(key, value)) as any
    }

    merge<U extends { [key: string]: any }>(other: U | Struct<U>): Struct<T & U> {
        if (other instanceof Struct) {
            return new Struct(this.store.merge(other.store)) as any

        } else {
            return new Struct(this.store.merge(other)) as any
        }
    }

    //update<K extends keyof T, V>(
    //    key: K,
    //    updater: (value: T[K]) => V
    //): Struct<Pick<T, Exclude<keyof T, K>> & { K: V }> {
    //    return new Struct(this.store.update(key as string, updater)) as any
    //}

    delete<K extends keyof T>(key: K): Struct<Pick<T, Exclude<keyof T, K>>> {
        return new Struct(this.store.remove(key as string)) as any
    }

    remove<K extends keyof T>(key: K): Struct<Pick<T, Exclude<keyof T, K>>> {
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

    unwrap(): Map<string, any> {
        return this.store
    }
}
