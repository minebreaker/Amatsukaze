import { Struct } from "../src/struct"

const s = Struct.of({ one: 1 })
const r = s.toJS()
const v: string = r.one
console.log(v)
