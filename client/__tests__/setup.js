import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

// Ensure TextEncoder and TextDecoder are available in tests
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Clean up the DOM after each test to avoid side effects
afterEach(() => cleanup());

console.log('setup.js loaded');
