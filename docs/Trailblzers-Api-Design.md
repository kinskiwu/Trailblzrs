## Trailblzrs API Design

## Overview

The Trailblzrs API enables users to discover national parks and view weather forecasts.

## Endpoints

### 1. Parks

#### GET /api/parks

Get national parks with filtering options.

**Query Parameters:**
- `page` (integer, optional): Default: 1
- `limit` (integer, optional): Default: 6

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
    "windSpeed": "5-10 mph",
  }
}
```

### 3. Trips

#### POST /api/trips

Create a new trip.

**Response:**
```json
{
  "success": true,
  "data": {
    "tripId": "TRIP123",
    "tripDetails": []
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
          },
          // ... additional parks
        ],
        "forecastDetails": [
          {
            "parkId": "PARK123",
            "high": 75,
            "low": 45,
            "weather": "Partly Cloudy",
            "windSpeed": "5-10 mph"
          },
          // ... additional forecasts
        ]
      },
      // ... up to 7 days
    ]
  }
}
```

#### PUT /api/trips/:tripId (Work In Progress)

Update a trip by adding or changing a park assignment.

**Request Body:**
```json
{
  "parkId": "PARK123",
  "newDate": "2025-02-25"
}
```

**Response:**
```json
{
  "success": true,
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
  }
}
```

### Trip Model

```javascript
{
  tripId: String,           // Unique identifier (required, unique)
  tripDetails: [            // Array of day plans (max 7 days)
    {
      date: String,         // Date
      parkDetails: [        // Embedded park information
        {
          parkId: String,
          parkName: String, // Park name
          state: String,    // State code
          npsLink: String,  // NPS website URL
          directions: String // Directions URL
        },
        // ... additional parks
      ],
      forecastDetails: [    // Embedded weather information
        {
          parkId: String,
          high: Number,     // High temperature
          low: Number,      // Low temperature
          weather: String,  // Weather conditions
          windSpeed: String // Wind speed
        },
        // ... additional forecasts
      ]
    },
    // ...
  ]
  timestamp: String
}
```

### Weather Cache Model

```javascript
{
  parkId: String,
  date: String,             // Date
  forecast: {
    high: Number,           // High temperature
    low: Number,            // Low temperature
    weather: String,        // Weather conditions
    windSpeed: String       // Wind speed
  },
  expiresAt: Date           // TTL expiration date (24 hours)
}
```

## External API Dependencies

- **National Park Service API**: Source of park data
- **National Weather Service API**: Source of weather forecasts
