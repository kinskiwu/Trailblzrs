export default {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/**/*.{test,integration}.js?(x)'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS imports
  },
};
