const fs = require("fs");
const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
    entry: "./server.ts",
    output: {
        path: path.join(__dirname, "../build"),
        filename: "server.js"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    target: "node",
    plugins: [new NodemonPlugin()]
};
