## Trailblzrs API Design

## Overview

The Trailblzrs API enables users to discover national parks and view weather forecasts. The API interacts with the National Park Service (NPS) API and National Weather Service (NWS) API to provide data about parks and weather conditions for planning trips.

## Architecture and Design Patterns

The API follows a layered architecture with clear separation of concerns:

1. **Controllers**: Handle HTTP requests/responses and route validation
2. **Services**: Implement business logic and interact with external APIs
3. **Models**: Define data schemas for MongoDB using Mongoose
4. **Routes**: Define API endpoints and connect them to controllers

This implementation uses the following design patterns:
- **Dependency Injection**: Services are injected into controllers, allowing for better testability and decoupling

## Endpoints

### 1. Parks

#### GET /api/parks

Get national parks with filtering options.

**Query Parameters:**
- `page` (integer, optional): Page number for pagination. Default: 1
- `limit` (integer, optional): Number of parks per page. Default: 6
- `state` (string, optional): Filter parks by state code (e.g., 'CA', 'NY')

**Response:**
```json
{
  "success": true,
  "data": {
    "parks": [
      {
        "parkId": "PARK123",
        "image": "https://...",
        "name": "Yosemite National Park",
        "city": "Yosemite Valley",
        "state": "CA",
        "description": "Park description text",
        "activities": ["Hiking", "Camping"...],
        "historicalRelevance": ["Native American Heritage"...],
        "npsLink": "https://www.nps.gov/yose",
        "directions": "https://www.nps.gov/yose/directions",
        "geolocation": {
          "latitude": 37.8651,
          "longitude": -119.5383
        }
      }
    ]
  }
}
```

### 2. Weather Forecast

#### GET /api/forecast

Get weather forecast for a park on a specific date.

**Query Parameters:**
- `parkId` (string, required): Park identifier
- `visitDate` (string, required): Format YYYY-MM-DD

**Response:**
```json
{
  "success": true,
  "data": {
    "parkId": "PARK123",
    "visitDate": "2025-02-25",
    "high": 75,
    "low": 45,
    "weather": "Partly Cloudy",
    "windSpeed": "5-10 mph"
  }
}
```

### 3. Trips

#### POST /api/trips

Create a new trip with park selections.

**Request Body:**
```json
{
  "parkSelections": [
    {
      "parkId": "PARK123",
      "visitDate": "2025-02-25"
    },
    {
      "parkId": "PARK456",
      "visitDate": "2025-02-26"
    }
    // At least 5 park selections are required
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tripId": "TRIP123",
    "tripDetails": [
      {
        "date": "2025-02-25",
        "parkDetails": [
          {
            "parkId": "PARK123",
            "parkName": "Yosemite National Park",
            "state": "CA",
            "npsLink": "https://www.nps.gov/yose",
            "directions": "https://www.nps.gov/yose/directions"
          }
        ],
        "forecastDetails": [
          {
            "parkId": "PARK123",
            "high": 75,
            "low": 45,
            "weather": "Partly Cloudy",
            "windSpeed": "5-10 mph"
          }
        ]
      }
    ]
  }
}
```

#### GET /api/trips/:tripId

Get a trip by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "tripId": "TRIP123",
    "tripDetails": [
      {
        "date": "2025-02-25",
        "parkDetails": [
          {
            "parkId": "PARK123",
            "parkName": "Yosemite National Park",
            "state": "CA",
            "npsLink": "https://www.nps.gov/yose",
            "directions": "https://www.nps.gov/yose/directions"
          }
        ],
        "forecastDetails": [
          {
            "parkId": "PARK123",
            "high": 75,
            "low": 45,
            "weather": "Partly Cloudy",
            "windSpeed": "5-10 mph"
          }
        ]
      }
    ]
  }
}
```

### PUT /api/trips/:tripId (To be implemented in future)

Update a trip by replacing park selections with a new set.

**Request Body:**
```json
{
  "parkSelections": [
    {
      "parkId": "PARK123",
      "visitDate": "2025-02-25"
    },
    {
      "parkId": "PARK456",
      "visitDate": "2025-02-26"
    }
    // At least 5 park selections are required
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tripId": "TRIP123",
    "tripDetails": [
      {
        "date": "2025-02-25",
        "parkDetails": [
          {
            "parkId": "PARK123",
            "parkName": "Yosemite National Park",
            "state": "CA",
            "npsLink": "https://www.nps.gov/yose",
            "directions": "https://www.nps.gov/yose/directions"
          }
        ],
        "forecastDetails": [
          {
            "parkId": "PARK123",
            "high": 75,
            "low": 45,
            "weather": "Partly Cloudy",
            "windSpeed": "5-10 mph"
          }
        ]
      }
    ]
  }
}
```

## Data Models

### Park Model

```javascript
{
  parkId: String,           // NPS ID (required, unique)
  image: String,            // Park image URL (first image)
  name: String,             // Park name
  city: String,             // City location
  state: String,            // State code
  description: String,      // Park description
  activities: [String],     // Available activities
  historicalRelevance: [String], // Historical topics
  npsLink: String,          // NPS website URL
  directions: String,       // Directions URL
  geolocation: {
    latitude: Number,       // Geographic coordinates
    longitude: Number
  },
  createdAt: Date,          // Timestamps from Mongoose
  updatedAt: Date
}
```

### Trip Model

```javascript
{
  tripId: String,           // Unique identifier (required, unique)
  tripDetails: [            // Array of day plans
    {
      date: String,         // Date
      parkDetails: [        // Embedded park information
        {
          parkId: String,
          parkName: String, // Park name
          state: String,    // State code
          npsLink: String,  // NPS website URL
          directions: String // Directions URL
        }
      ],
      forecastDetails: [    // Embedded weather information
        {
          parkId: String,
          high: Number,     // High temperature
          low: Number,      // Low temperature
          weather: String,  // Weather conditions
          windSpeed: String // Wind speed
        }
      ]
    }
  ],
  createdAt: Date,          // Timestamps from Mongoose
  updatedAt: Date
}
```

## Authentication and Authorization

The API currently does not implement authentication. All endpoints are publicly accessible.

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "details": "Additional error details"
}
```

Common error status codes:
- `400`: Bad Request - Missing or invalid parameters
- `404`: Not Found - Resource not found
- `500`: Internal Server Error - Server-side processing error

## External API Dependencies

- **National Park Service API**: Source of park data
  - Requires API key set as `NPS_API_KEY` environment variable
  - Base URL: `https://developer.nps.gov/api/v1/parks`

- **National Weather Service API**: Source of weather forecasts
  - Public API (no key required)
  - Base URL: `https://api.weather.gov/points`

## Database

The API uses MongoDB for data persistence:
- Requires connection string set as `MONGODB_URI` environment variable
- Stores park data fetched from NPS API
- Stores trip information created by users

## Development and Testing

- **Node.js and npm**: Project built with Node.js and managed with npm
- **Express**: Web framework used for API routes
- **Jest**: Testing framework for unit and integration tests
- **Supertest**: HTTP assertion library for API testing

## Future Development

1. **Trip Updates**: The PUT /api/trips/:tripId endpoint for updating a trip by adding or changing a park assignment is not implemented yet.

2. **Park Filtering**: Add support for filtering parks by activities, historical relevance, or weather conditions.

3. **Park Sorting**: Implement advanced sorting options for parks by weather conditions, proximity to user location, or historical relevance.

4. **Enhanced Weather Data**: Add humidity data to the weather forecast retrieval.

5. **Improved Caching Strategy**: Implement caching system for external API responses to improve performance and reduce external API calls.

6. **Google Maps Integration**: Add integration with Google Maps API.

7. **Advanced Weather Customization**: Implement additional weather data options and customization features for trip planning.

8. **Google Sheets Integration**: Add functionality to export trip data to Google Sheets, including an API endpoint and service for generating the required spreadsheet format.

9. **Automated Data Pipeline**: Set up GitHub Actions to automate regular data retrieval from external APIs and update spreadsheets/databases with the latest information.

10. **Unit Testing**: Implement unit tests for key services, controllers, and utility functions.

11. **End-to-End Testing**: Implement E2E testing to verify complete API workflows and integration with external services.

12. **Security Measures**: Add security enhancements including Helmet.js, and API authentication.

13. **Request Validation**: Add comprehensive input validation using a library like Joi or express-validator.

14. **Rate Limiting**: Implement rate limiting to protect the API from abuse and ensure fair usage.

15. **Enhanced CORS Configuration**: Set up more robust CORS options with specific origin controls.

16. **Centralized Error Handling**: Implement a global error handler middleware to process all errors consistently across the application.

17. **Logging**: Implement structured logging for better debugging and monitoring capabilities.
