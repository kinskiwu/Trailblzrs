export default {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.{test,integration}.js?(x)'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'], // Run setup script after environment setup
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel to transform JS and JSX files
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS imports
  },
};
