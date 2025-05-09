import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
    {
        languageOptions: {
            ecmaVersion: 'latest',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    },
    {
        name: 'app/files-to-ignore',
        ignores: [
            '**/*.svg',
            '**/dist/**',
            '**/dist-ssr/**',
            '**/coverage/**',
            'public/**',
            'DrawText',
            '**/*.min.js',
            '**/*.cjs',
            '**/*.json'
        ]
    },
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}']
    },

    globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*']
    },
    skipFormatting,
    {
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
            indent: ['error', 4, {
                SwitchCase: 1
            }],
            'no-console': 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'vue/html-closing-bracket-newline': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/multi-word-component-names': 'off',
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
        }
    }
)
