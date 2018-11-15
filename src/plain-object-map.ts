export class PlainObjectMap<T> {

    constructor(private readonly store: T) {}

    get<K extends keyof T>(key: K): T[K] {
        //@ts-ignore  // for JavaScript
        if (Object.keys(this.store).indexOf(key) < 0) {
            throw new Error("No such element.")
        }

        return this.store[key]
    }

    set<K extends string, V, U extends { [P in K]: V }>(key: K, value: V): PlainObjectMap<T & U> {
        const newEntry: U = <U> { [key]: value }
        return new PlainObjectMap(Object.assign({}, this.store, newEntry))
    }
}
