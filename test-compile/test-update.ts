import { Struct } from "../src/struct"

const s = Struct.of({ one: 1 }).update("one", () => "two")
const two: number = s.get("one")
console.log(two)
