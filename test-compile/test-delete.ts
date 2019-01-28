import { Struct } from "../src/struct"

const s = Struct.of({ one: 1 }).delete("one")
s.get("one")
