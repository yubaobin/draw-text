module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es6: true,
        'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        'comma-dangle': ['error', 'never'],
        'template-curly-spacing': 'off',
        'no-use-before-define': 'off',
        'no-unused-expressions': 'off',
        'space-before-function-paren': ['error', 'always'],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        semi: ['error', 'never'],
        'lines-between-class-members': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        'no-tabs': 'off',
        'prefer-const': 'off',
        indent: ['off', 4],
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': ['error', {
            'ignores': ['index']
        }],
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ]
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
}
