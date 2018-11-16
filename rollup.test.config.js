const rollupTypescript = require("rollup-plugin-typescript")
const rollupNodeResolve = require("rollup-plugin-node-resolve")
const rollupCommonJs = require("rollup-plugin-commonjs")

module.exports = {
    input: "test/test-all.ts",
    output: {
        dir: "out",
        file: "test-all.js",
        format: "esm"
    },
    plugins: [
        rollupTypescript(),
        rollupCommonJs({
            namedExports: {
                "node_modules/chai/index.js": ["assert", "expect"]
            }
        }),
        rollupNodeResolve(),
    ]
}
