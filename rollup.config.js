const rollupTypescript = require("rollup-plugin-typescript")

module.exports = {
    input: "src/index.ts",
    output: {
        dir: "out",
        file: "index.js",
        format: "esm"
    },
    plugins: [
        rollupTypescript()
    ]
}
