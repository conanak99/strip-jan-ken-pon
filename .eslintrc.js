module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        "react-app",
        'eslint:recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: [
        'react',
        'react-native'
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        'jest': true
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    rules: {
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "react-native/no-inline-styles": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "react-hooks/exhaustive-deps": 0
    }
};