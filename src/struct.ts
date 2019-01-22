import { Map, ValueObject } from "immutable"

export class Struct<T> implements ValueObject {

    private readonly store: Map<string, any>

    private constructor(store?: T) {
        this.store = Map(store || {})
    }

    static of<T>(initialValue?: T): Struct<T> {
        // TODO return singleton when `initialValue` is falsy
        return new Struct(initialValue)
    }

    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // key check for JavaScript
        if (Object.keys(this.store).indexOf(key) < 0) {
            throw new Error("No such element.")  // TODO should return undefined?
        }

        return this.store.get(key as string) as any
    }

    // orElse

    has(key: string): boolean {
        return key in this.store
    }

    set<K extends string, V, U extends { [_ in K]: V }>(key: K, value: V): Struct<T & U> {
        return new Struct(this.store.set(key, value)) as any
    }

    merge<U>(other: U | Struct<U>): Struct<T & U> {
        if (other instanceof Struct) {
            return new Struct(this.store.merge(other.store)) as any

        } else {
            const copy = Object.assign({}, this.store, other)
            return new Struct(copy) as any
        }
    }

    update<K extends keyof T, V>(
        key: K,
        updater: (value: T[K]) => V
    ): Struct<Pick<T, Exclude<keyof T, K>> & { K: V }> {
        return new Struct(this.store.update(key as string, updater)) as any
    }

    delete<K extends keyof T>(key: K): Struct<Pick<T, Exclude<keyof T, K>>> {
        return new Struct(this.store.remove(key as string)) as any
    }

    remove<K extends keyof T>(key: K): Struct<Pick<T, Exclude<keyof T, K>>> {
        return this.delete(key)
    }

    hashCode(): number {
        return this.store.hashCode()
    }

    equals(other: any): boolean {
        return this === other || (other instanceof Struct && this.store.equals(other.store)) || this.store.equals(other)
    }
}
