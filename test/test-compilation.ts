import * as ts from "typescript"
import * as fs from "fs"
import * as path from "path"


const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2015,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    strict: true,
    noImplicitAny: true,
    noEmit: true
}

function compile(fileName: string): ts.Diagnostic[] {
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

    fs.readdir(testResourceDir, (e, files) => {
        if (e) {
            throw Error("IO failed.")
        }

        const result = files
            .map(e => path.resolve(testResourceDir, e))
            .filter(e => e.endsWith(".ts"))
            .map(file => [file, compile(file)])
            // filter successful compilation, if any, that test has failed
            .filter(([_, diagnostics]) => diagnostics.length === 0)

        if (result.length !== 0) {
            result.forEach(([file]) => {
                console.warn(`Test failed for file '${file}'`)
            })

            // Wait for console output and then exits
            setTimeout(() => {
                process.exit(2)
            }, 500)
        } else {
            console.log("Test was successful.")
        }
    })
}

run()
