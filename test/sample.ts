import { assert } from "chai"


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

        assert.strictEqual(greet(jaina), "Hello, Jaina!")
    })
})
