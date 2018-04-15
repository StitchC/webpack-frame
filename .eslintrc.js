module.exports = {
    root: true,
    extends: 'standard',
    plugins: [
        'html'
    ],
    env: {
        browser: true
    },
    globals: {
      '$': false
    },
    rules: {
        'indent': ['warn', 4],
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-multiple-empty-lines": [0, {"max": 100}],
        "no-inline-comments": 0,
        "space-before-function-paren": 0,
        "no-trailing-spaces": 0,
        "keyword-spacing": 0,
        'indent': 0,
        'eol-last': 0
    }
}