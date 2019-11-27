const babel = require('rollup-plugin-babel');

const extensions = [ '.ts', '.js', ];

module.exports = exports = [
    {
        input: './src/index.js',
        output: {
            file: './dist/jssdk.esm.js',
            format: 'es',
        },
        plugins: [
            babel({
                extensions: extensions,
                exclude: 'node_modules/**',
            }),
        ],
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/jssdk.cjs.js',
            format: 'cjs',
        },
        plugins: [
            babel({
                extensions: extensions,
                exclude: 'node_modules/**',
            }),
        ],
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/jssdk.js',
            format: 'umd',
            name: 'jssdk',
        },
        plugins: [
            babel({
                extensions: extensions,
                exclude: 'node_modules/**',
            }),
        ],
    },
];
