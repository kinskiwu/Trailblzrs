export default {
  // Mock GET request to return mock park data
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          parks: require('../__mocks__/mockParks').mockParks,
        },
      },
    }),
  ),
  // Mock POST request to return an empty successful response
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
