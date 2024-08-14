const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: {
            name: "FlexGridify",
            type: "var",
            export: 'default' //<-- New line
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },

}