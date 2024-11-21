import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import functional from 'eslint-plugin-functional';
import imprt from 'eslint-plugin-import';

const myRules = {
  'max-len': ['warn', { code: 90, ignoreComments: false, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
};

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './jsconfig.json',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      import: imprt,
      functional,
      '@typescript-eslint': ts,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs['recommended'].rules,
      ...myRules,
      '@typescript-eslint/return-await': 'error',
    },
    ignores: ['.next/*'],
  },
];
