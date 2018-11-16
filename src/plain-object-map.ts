export class PlainObjectMap<T> {

    // TODO does not expose public constructor
    constructor(private readonly store: T) {}

    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // for JavaScript
        if (Object.keys(this.store).indexOf(key) < 0) {
            throw new Error("No such element.")  // TODO should return undefined?
        }

        return this.store[key]
    }

    // orElse

    has(key: string): boolean {
        return key in this.store
    }

    set<K extends string, V, U extends { [_ in K]: V }>(key: K, value: V): PlainObjectMap<T & U> {
        const newEntry: U = <U> { [key]: value }
        return new PlainObjectMap(Object.assign({}, this.store, newEntry))
    }

    update<K extends keyof T>(
        key: K,
        updater: (value: T[K]) => T[K]
    ): PlainObjectMap<T> {
        const copy = Object.assign({}, this.store, { [key]: updater(this.store[key]) })
        return new PlainObjectMap(copy)
    }

    delete<K extends keyof T>(key: K): PlainObjectMap<Pick<T, Exclude<keyof T, K>>> {
        const copy = Object.assign({}, this.store)
        delete copy[key]
        return new PlainObjectMap(copy) as any
    }

    remove<K extends keyof T>(key: K): PlainObjectMap<Pick<T, Exclude<keyof T, K>>> {
        return this.delete(key)
    }
}
