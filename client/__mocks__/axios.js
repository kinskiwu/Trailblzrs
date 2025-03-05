export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          parks: require('../__mocks__/mockParks').mockParks,
        },
      },
    }),
  ),
  post: jest.fn(() => Promise.resolve({ data: {} })),
};
