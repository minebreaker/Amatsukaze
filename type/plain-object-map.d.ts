export declare class PlainObjectMap<T> {
    private readonly store;
    constructor(store: T);
    get<K extends keyof T>(key: K): T[K];
    has(key: string): boolean;
    set<K extends string, V, U extends {
        [_ in K]: V;
    }>(key: K, value: V): PlainObjectMap<T & U>;
    update<K extends keyof T>(key: K, updater: (value: T[K]) => T[K]): PlainObjectMap<T>;
    delete<K extends keyof T>(key: K): PlainObjectMap<Pick<T, Exclude<keyof T, K>>>;
    remove<K extends keyof T>(key: K): PlainObjectMap<Pick<T, Exclude<keyof T, K>>>;
}
