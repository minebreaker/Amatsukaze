export declare class PlainObjectMap<T> {
    private readonly store;
    constructor(store: T);
    get<K extends keyof T>(key: K): T[K];
    set<K extends string, V, U extends {
        [P in K]: V;
    }>(key: K, value: V): PlainObjectMap<T & U>;
}
