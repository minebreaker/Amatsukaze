import { assert, expect } from "chai"
import { Struct } from "../src"
//import { Record } from "immutable"

describe("Struct", () => {

    describe("#get", () => {
        it("should return values", () => {
            const store = Struct.of({ one: "one", two: 2, three: { foo: "bar" } })

            assert.strictEqual(store.get("one"), "one")
            assert.strictEqual(store.get("two"), 2)
            assert.deepStrictEqual(store.get("three"), { foo: "bar" })
        })

        it("should throw an exception when the key does not exist", () => {
            const store = Struct.of({})
            //@ts-ignore
            expect(() => store.get("one")).to.throw("No such element for the key 'one'.")
        })
    })

    describe("#has", () => {
        it("should return true if it contains the key", () => {
            const store = Struct.of({ one: 1 })

            assert.isTrue(store.has("one"))
            assert.isFalse(store.has("two"))
        })
    })

    describe("#set", () => {
        it("should create an immutable copy", () => {
            const store = Struct.of({ "one": 1 })
            const result = store.set("two", 2).set("one", "one")

            assert.strictEqual(store.get("one"), 1)
            assert.strictEqual(result.get("one"), "one")
            assert.strictEqual(result.get("two"), 2)
        })
    })

    describe("#merge", () => {
        it("should create an immutable copy merging a plain object", () => {
            const store = Struct.of({ "one": 1 }).merge({ "two": 2 })

            assert.strictEqual(store.get("one"), 1)
            assert.strictEqual(store.get("two"), 2)
        })

        it("should create an immutable copy merging a Struct instance", () => {
            const store = Struct.of({ "one": 1 }).merge(Struct.of({ "two": 2 }))

            assert.strictEqual(store.get("one"), 1)
            assert.strictEqual(store.get("two"), 2)
        })
    })

    //describe("#update", () => {
    //    it("should create an immutable copy updating the key", () => {
    //        const store = Struct.of({ "one": 1 })
    //        //const result = store.update("one", v => v * 2)  // FIXME
    //
    //        assert.strictEqual(store.get("one"), 1)
    //        //assert.strictEqual(result.get("one"), 2)
    //    })
    //})

    describe("#delete", () => {

        it("should create an immutable copy without the key", () => {
            const store = Struct.of({ "one": 1, "two": 2 })
            const result = store.delete("one").remove("two")

            assert.strictEqual(store.get("one"), 1)
            assert.strictEqual(store.get("two"), 2)
            //@ts-ignore
            expect(() => result.get("one")).to.throw()
            //@ts-ignore
            expect(() => result.get("two")).to.throw()
        })
    })

    //describe("#hashCode", () => {
    //    it("should be compatible with Immutable.js Record", () => {
    //        const param = { "one": 1, "two": 2 }
    //        const store = Struct.of(param)
    //        const record = Record(param)()
    //
    //        assert.strictEqual(store.hashCode(), record.hashCode())
    //    })
    //})

    //describe("#euqals", () => {
    //    it("should be compatible with Immutable.js Record", () => {
    //        const param = { "one": 1, "two": 2 }
    //        const store = Struct.of(param)
    //        const record = Record(param)()
    //
    //        assert.isTrue(store.strictEquals(record))
    //        assert.isTrue(record.strictEquals(store))
    //    })
    //})
})
