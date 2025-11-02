import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config([
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            react.configs.recommended,
            reactHooks.configs['recommended-latest'],
        ],
        settings: {
            react: {
                version: 'detect',
                jsxRuntime: 'automatic',
            },
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
        },
    },
]);
