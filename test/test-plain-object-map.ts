import { ExMap } from "../src"
import { assert } from "chai"

describe("PlainObjectMap", () => {

    it("get", () => {
        const store = new ExMap({ one: "one", two: 2, three: { foo: "bar" } })

        assert.equal(store.get("one"), "one")
        assert.equal(store.get("two"), 2)
        assert.deepStrictEqual(store.get("three"), { foo: "bar" })
    })

    it("set", () => {
        const store = new ExMap({ "one": 1 })
        const result = store.set("two", 2).set("one", "one")

        assert.equal(store.get("one"), 1)
        assert.equal(result.get("one"), "one")
        assert.equal(result.get("two"), 2)
    })
})
