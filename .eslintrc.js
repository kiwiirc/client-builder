module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        'no-plusplus': 0,
        'operator-linebreak': ['error', 'after'],
        // Temp
        'prefer-const': 0,
        'arrow-parens': 0,
        'prefer-destructuring': 0,
        'no-underscore-dangle': 0,
        'object-shorthand': 0,
        'no-param-reassign': 0,
        'max-classes-per-file': 0,

    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],
};
