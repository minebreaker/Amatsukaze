import { assert } from "chai"
import { Map, Record } from "immutable"

// These tests assures how Immutable.js works.

describe("Compatibility with Map and Record", () => {

    describe("#hashCode", () => {
        it("should return same hashCode", () => {
            const param = { one: 1, two: 2, three: "three" }
            const map = Map(param)
            const record = Record(param)()

            assert.strictEqual(map.hashCode(), record.hashCode())
        })

    })

    describe("#equals", () => {
        it("#equals", () => {
            const param = { one: 1, two: 2, three: "three" }
            const map = Map(param)
            const record = Record(param)()

            assert.isFalse(map.equals(record))
        })
    })
})
