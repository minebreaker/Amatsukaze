const rollupTypescript = require("rollup-plugin-typescript")

module.exports = {
    input: "src/index.ts",
    output: {
        file: "out/index.js",
        format: "esm"
    },
    plugins: [
        rollupTypescript()
    ]
}
