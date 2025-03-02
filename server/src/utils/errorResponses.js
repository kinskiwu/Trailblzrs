/**
 * Error response for 400 Bad Request
 * @param {string} message - Error message
 * @param {any} details - Additional error details
 * @returns {Object} Error object
 */
export const badRequestError = (message = 'Bad request', details = null) => ({
  status: 400,
  message,
  details,
});

/**
 * Eror response for 404 Not Found
 * @param {string} resource - The resource that wasn't found
 * @returns {Object} Error object
 */
export const notFoundError = (resource = 'Resource') => ({
  status: 404,
  message: `${resource} not found`,
  details: null,
});

/**
 * Error response for 500 Server Error
 * @param {string} message - Error message
 * @param {any} details - Additional error details
 * @returns {Object} Error object
 */
export const serverError = (
  message = 'Internal server error',
  details = null,
) => ({
  status: 500,
  message,
  details,
});
