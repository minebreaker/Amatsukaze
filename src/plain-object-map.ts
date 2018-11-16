export class PlainObjectMap<T> {

    constructor(private readonly store: T) {}

    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // for JavaScript
        if (Object.keys(this.store).indexOf(key) < 0) {
            throw new Error("No such element.")
        }

        return this.store[key]
    }

    has(key: string): boolean {
        return key in this.store
    }

    set<K extends string, V, U extends { [_ in K]: V }>(key: K, value: V): PlainObjectMap<T & U> {
        const newEntry: U = <U> { [key]: value }
        return new PlainObjectMap(Object.assign({}, this.store, newEntry))
    }

    delete<K extends keyof T>(key: K): PlainObjectMap<Pick<T, Exclude<keyof T, K>>> {
        const copy = Object.assign({}, this.store)
        delete copy[key]
        return new PlainObjectMap(copy)
    }

    remove<K extends keyof T>(key: K): PlainObjectMap<Pick<T, Exclude<keyof T, K>>> {
        return this.delete(key)
    }
}
