# Trailblzrs - National Park Road Trip Planner

Trailblzrs is a web application that helps users plan their road trips to US National Parks by providing park information, weather forecasts, and itinerary creation tools.

## Features

- **Park Discovery**: Browse and filter National Parks by location
- **Weather Integration**: View 7-day weather forecasts for each park (Work in Progress)
- **Trip Planning**: Create a 7-day itinerary with multiple parks (Work in Progress)
- **Google Sheets Export**: Export your itinerary with all details (Work in Progress)

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: National Park Service API, National Weather Service API

## Project Structure

```
├── client/
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       └── mocks/          # Mock data for development
├── server/
│   └── src/
│       ├── config/         # Configuration files
│       ├── controllers/    # Route handlers
│       ├── models/         # MongoDB schemas
│       ├── routes/         # Routes
│       └── services/       # Business logic
├── docs/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- [MongoDB Atlas URI](https://www.mongodb.com/products/platform/atlas-database)
- [National Park Service API key](https://www.nps.gov/subjects/developer/get-started.htm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/simplifi-challenge/corporate-systems-engineer-api-data-retrieval-Jiaxin-Wu.git
   cd corporate-systems-engineer-api-data-retrieval-Jiaxin-Wu
   ```

2. **Install dependencies**

   **Root directory:**
   ```bash
   npm install
   ```
   **Backend (`server` directory):**
   ```bash
   cd server
   npm install
   ```
   **Frontend (`client` directory):**
   ```bash
   cd ../client
   npm install
   ```
3. **Set up environment variables**

   Create a `.env` file in the `server` directory with the following:
   ```env
   MONGODB_URI=your-mongo_atlas_uri
   NPS_API_KEY=your_nps_api_key
   ```
4. **Start the development environment**

   **In the `server` directory:**
   ```bash
   npm run dev
   ```

   **In the `client` directory:**
   ```bash
   npm run dev
   ```
5. **Open your browser**

   Navigate to [`http://localhost:5173`](http://localhost:5173)

## Core Functionalities

### Park Selection
- Uses the National Park Service API to fetch park data
- Filters parks by location (state)

### Weather Data
- Integrates with the National Weather Service API
- Fetches forecast based on park geolocation and specific date within the next 7 days

### Trip Planning
- Allows assignment of parks to specific days
- Stores trip details
- Forwards trip details to Google Sheet (Work in Progress)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/parks` | GET | Retrieve 6 parks at a time |
| `/api/forecast` | GET | Get weather forecast for a park on a specific date |
| `/api/trips` | POST | Create a new trip |
| `/api/trips/:tripId` | GET | Retrieve a trip by ID |
| `/api/trips/:tripId` | PUT | Update a trip by adding/changing a park assignment |

## Design Decisions

- **Additional data for rendering parks**: : I added more park details, such as images and descriptions, to enhance the user experience on the park discovery page.

- **React + Express + JavaScript**: Chosen for rapid development and straightforward implementation. This stack offers a good balance of flexibility and developer productivity for a project of this scope. In a larger production environment, additional tools like TypeScript or Next.js might be considered.

- **MongoDB**: Selected for two primary reasons:
  - The flexible schema accommodates the varying structure of park data and itineraries
  - Built-in TTL indexes provide simple document expiration for caching (Work in Progress)

  While not as performant for caching as in memory DB like Redis, MongoDB offers a simpler architecture by keeping all data in one system.

- **Embedded Park/Forecast Data in Trips**: Since park information and weather forecasts change over time, embedding this data in trip records preserves the exact information the user saw when planning. This approach ensures historical accuracy of itineraries even when external data sources change.

- **Caching Strategy**: The application implements data caching in MongoDB with TTL indexes. For a production system with higher traffic, a dedicated caching layer might be preferable, but this approach provides a good balance of simplicity and performance for the current requirements. (Work in Progress)

## Additional Documentation

- **Wireframes**: [Click here](https://balsamiq.cloud/slveto6/plezzeg/r2278)
- **API Design**: [Click here](docs/Trailblzers-Api-Design.md)

## Stretch Features

- Testing (happy paths & edge cases)
- Caching (Parks data for 7 days, weather data for 24 hours)
- User authentication
- Google Maps integration
- Additional filtering options (activities, entrance fees)
- Additional sorting options
- Automated data fetching and Google sheets update