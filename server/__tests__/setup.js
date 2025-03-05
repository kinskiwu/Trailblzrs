import mongoose from 'mongoose';
import { jest } from '@jest/globals';

// Mock mongoose.connect
mongoose.connect = jest.fn().mockResolvedValue({
  connection: { on: jest.fn() },
});

// Create mock objects
const mockPark = {
  findOneAndUpdate: jest.fn().mockResolvedValue({}),
  find: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
};

const mockTrip = {
  findOneAndUpdate: jest.fn().mockResolvedValue({}),
  findOne: jest.fn().mockResolvedValue(null),
};

jest.unstable_mockModule('../src/models/parkSchema.js', () => ({
  Park: mockPark,
}));

jest.unstable_mockModule('../src/models/tripSchema.js', () => ({
  Trip: mockTrip,
}));

export const mockAxios = () => ({
  get: jest.fn(),
});

export { mockPark as Park, mockTrip as Trip };
