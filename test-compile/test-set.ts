import { Struct } from "../src/struct"

const s = Struct.of({ one: 1 }).set("one", "one")
const two: number = s.get("one")
console.log(two)
