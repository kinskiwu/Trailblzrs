import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["node_modules", "dist", "build", ".cache"] },

  // For client
  {
    files: ["client/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Use browser-specific globals
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off", // Allow links to open in new tabs without security warnings
      'react/prop-types': 'off', // Disable prop-types enforcement
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }, // Warn when exporting non-components in React Refresh
      ],
    },
  },

  // Config for test files
  {
    files: [
      "client/__tests__/**/*.{js,jsx}",
      "client/__mocks__/**/*.{js,jsx}"
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.nodeBuiltin,
        afterEach: "readonly",
        beforeEach: "readonly",
        describe: "readonly",
        expect: "readonly",
        jest: "readonly",
        test: "readonly",
        it: "readonly"
      },
    },
  },

  // For server
  {
    files: ["server/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // Use Node.js-specific globals
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "warn", // Warn on console.log usage in server code
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],  // Allow unused variables prefixed with _
    },
  },
];