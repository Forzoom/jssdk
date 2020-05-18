module.exports = function (config) {
    config.set({
        browsers: [
            'Chrome',
        ],
        frameworks: [
            'jasmine',
            'sinon-chai',
        ],
        reporters: [
            'spec',
        ],
        files: [
            '../../node_modules/babel-polyfill/dist/polyfill.js',
            '../../dist/jssdk.js',
            './spec/**/*.spec.js',
        ],
        plugins: [
            'karma-jasmine',
            'karma-sinon-chai',
            'karma-spec-reporter',
            'karma-chrome-launcher',
        ],
    });
}