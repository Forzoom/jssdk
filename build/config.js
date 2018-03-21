module.exports = exports = [
    {
        input: './src/index.js',
        output: {
            file: './dist/jssdk.esm.js',
            format: 'es',
        },
    },
    {
        input: './src/index.js',
        output: {
            file: './dist/jssdk.cjs.js',
            format: 'cjs',
        },
    },
];