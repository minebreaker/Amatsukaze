import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"
import { assert } from "chai"


const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2015,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    strict: true,
    noImplicitAny: true,
    noEmit: true
}

function compile(fileName: string): ReadonlyArray<ts.Diagnostic> {
    const program = ts.createProgram([fileName], options)
    const diagnostics = ts.getPreEmitDiagnostics(program)
    if (diagnostics) {
        console.log(fileName)
        diagnostics.forEach(e => {
            console.log("> " + e.messageText)
        })
    }
    return diagnostics
}

function run() {

    const testResourceDir = "./test-compile"

    const result = fs
        .readdirSync(testResourceDir)
        .map(e => path.resolve(testResourceDir, e))
        .filter(e => e.endsWith(".ts"))
        .map(file => [file, compile(file)])
        // filter successful compilation, if any, that test has failed
        .filter(([_, diagnostics]) => diagnostics.length === 0)

    if (result.length !== 0) {
        const failedFileNames = result.map(e => `'${e}'`).join(", ")
        assert.fail(null, null, `Test failed for files ${failedFileNames}`)
    }
}

describe("compilation", () => {
    it("should fail to compile", function (this: any) {
        this.timeout(100000)

        run()
    })
})

