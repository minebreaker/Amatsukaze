import { assert, expect } from "chai"
import { PlainObjectMap } from "../src/plain-object-map"

describe("PlainObjectMap", () => {

    describe("#get", () => {
        it("should return values", () => {
            const store = new PlainObjectMap({ one: "one", two: 2, three: { foo: "bar" } })

            assert.equal(store.get("one"), "one")
            assert.equal(store.get("two"), 2)
            assert.deepStrictEqual(store.get("three"), { foo: "bar" })
        })

        it("should throw an exception when the key does not exist", () => {
            const store = new PlainObjectMap({})
            //@ts-ignore
            expect(() => store.get("one")).to.throw("No such element.")
        })
    })

    describe("#has", () => {
        it("should return true if it contains the key", () => {
            const store = new PlainObjectMap({ one: 1 })

            assert.isTrue(store.has("one"))
            assert.isFalse(store.has("two"))
        })
    })

    describe("#set", () => {
        it("should create an immutable copy", () => {
            const store = new PlainObjectMap({ "one": 1 })
            const result = store.set("two", 2).set("one", "one")

            assert.equal(store.get("one"), 1)
            assert.equal(result.get("one"), "one")
            assert.equal(result.get("two"), 2)
        })
    })

    describe("#update", () => {
        it("should create an immutable copy updating the key", () => {
            const store = new PlainObjectMap({ "one": 1 })
            const result = store.update("one", v => v * 2)

            assert.equal(store.get("one"), 1)
            assert.equal(result.get("one"), 2)
        })
    })

    describe("#delete", () => {

        it("should create an immutable copy without the key", () => {
            const store = new PlainObjectMap({ "one": 1, "two": 2 })
            const result = store.delete("one").remove("two")

            assert.equal(store.get("one"), 1)
            assert.equal(store.get("two"), 2)
            //@ts-ignore
            expect(() => result.get("one")).to.throw()
            //@ts-ignore
            expect(() => result.get("two")).to.throw()
        })
    })
})
