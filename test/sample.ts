import { assert } from "chai"
import { Struct } from "../src"


interface Person {
    firstName: string
    lastName: string
}

function greet(person: Person): string {
    return `Hello, ${person.lastName}!`
}

describe("Plain JavaScript object", () => {
    it("", () => {
        const person: Person = { firstName: "Han", lastName: "Solo" }
        const result = greet(person)

        assert.strictEqual(result, "Hello, Solo!")
    })

    it("is sad but true that JavaScript object is not immutable", () => {
        const han: Person = { firstName: "Han", lastName: "Solo" }
        han.firstName = "Jacen"  // !?
    })

    it("is freaking outrageous to use JavaScript API to fix that.", () => {
        const han: Person = Object.freeze({ firstName: "Han", lastName: "Solo" })
        const jaina = Object.assign({}, han, { firstName: "Jaina" })

        assert.strictEqual(jaina.firstName, "Jaina")
    })
})

describe("Map", () => {

})

describe("Record", () => {

})

describe("Struct", () => {
    it("is type-safe using Struct values.", () => {
        const s = Struct.of({ one: 1, two: "two", three: { foo: "bar" } })
        const one: number = s.get("one")
        const two: string = s.get("two")
        const three: { foo: string } = s.get("three")

        assert.strictEqual(one, 1)
        assert.strictEqual(two, "two")
        assert.deepStrictEqual(three, { foo: "bar" })
    })
})
