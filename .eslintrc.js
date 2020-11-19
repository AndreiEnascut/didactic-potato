// Default configs: https://github.com/vuejs/eslint-plugin-vue/tree/master/lib/configs
// Rules:           https://github.com/vuejs/eslint-plugin-vue/tree/master/docs/rules

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        plugins: ['typescript']
    },
    plugins: [
        "vue"
    ],
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended',
    ],
    rules: {
        'no-console': ["error", {
            'allow' : ["warn", "error"]
        }],

        // the next two have to be turned off to avoid errors with nuxt-class-component
        'no-undef': 'off',
        'no-unused-vars': 'off',

        // vue plugin rules
        'vue/attribute-hyphenation': [2, 'never'],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "never"
        }],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': ['error', {
            'html': {
                'void': 'always',
                'normal': 'never',
                'component': 'always'
            }
        }],
        'vue/max-attributes-per-line': [2, {
            'singleline': 1,
            'multiline': {
                'max': 1,
                'allowFirstLine': true
            }
        }],
        "vue/require-component-is": "off"
    }
};
