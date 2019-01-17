import { Map, ValueObject } from "immutable"

export class ImMap<T> implements ValueObject {

    private readonly store: Map<string, any>

    // TODO does not expose public constructor
    constructor(store: T) {
        this.store = Map(store)
    }

    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // for JavaScript
        if (Object.keys(this.store).indexOf(key) < 0) {
            throw new Error("No such element.")  // TODO should return undefined?
        }

        return this.store.get(key as string) as any
    }

    // orElse

    has(key: string): boolean {
        return key in this.store
    }

    set<K extends string, V, U extends { [_ in K]: V }>(key: K, value: V): ImMap<T & U> {
        return new ImMap(this.store.set(key, value)) as any
    }

    merge<U>(other: U | ImMap<U>): ImMap<T & U> {
        if (other instanceof ImMap) {
            return new ImMap(this.store.merge(other.store)) as any

        } else {
            const copy = Object.assign({}, this.store, other)
            return new ImMap(copy) as any
        }
    }

    update<K extends keyof T, V>(
        key: K,
        updater: (value: T[K]) => V
    ): ImMap<Pick<T, Exclude<keyof T, K>> & {K: V}> {
        return new ImMap(this.store.update(key as string, updater)) as any
    }

    delete<K extends keyof T>(key: K): ImMap<Pick<T, Exclude<keyof T, K>>> {
        return new ImMap(this.store.remove(key as string)) as any
    }

    remove<K extends keyof T>(key: K): ImMap<Pick<T, Exclude<keyof T, K>>> {
        return this.delete(key)
    }

    hashCode(): number {
        // TODO performance
        return this.store.hashCode()
    }

    equals(other: any): boolean {
        return this === other || this.store.equals(other)
    }
}
