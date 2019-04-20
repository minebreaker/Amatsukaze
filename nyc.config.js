module.exports = {
    include: ["src/**/*.ts"],
    extension: [".ts"],
    all: true,
    require: ["./test/register-helper", "source-map-support/register"],
    reporter: [
        "text",
        "text-summary"
    ]
}
