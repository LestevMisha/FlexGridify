const path = require("path");

module.exports = {
    mode: "production",
    // mode: "development",
    // devServer: {
    //     static: {
    //         directory: path.join(__dirname, 'website-tester'),
    //       },
    //     allowedHosts: "all",
    // },
    entry: {
        bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        library: {
            name: 'FlexGridify',
            type: 'umd',
            // add this to export your class to the library
            export: "default"
        },
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