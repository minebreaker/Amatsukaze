import { assert } from "chai"
import * as im from "immutable"
import { Struct } from "../src"


describe("#isImmutable", () => {
    it("should be considered as immutable", () => {
        const struct = Struct.of()
        assert.isTrue(im.isImmutable(struct))
    })
})

describe("#hash", () => {
    it("should be same value returned by Struct.hashCode() and hash(Struct)", () => {
        const param = Struct.of({ foo: "bar" })
        const h1 = param.hashCode()
        const h2 = im.hash(param)

        assert.strictEqual(h1, h2)
    })
})
