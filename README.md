# 🚞 Trailblzrs - National Park Road Trip Planner

Trailblzrs is a web application that helps users plan their road trips to US National Parks by providing park information, weather forecasts, and itinerary creation tools.

## 🛠️ Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: National Park Service API, National Weather Service API

## 📁 Project Structure

```
├── client/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   └── mocks/          # Mock data for testing
│   └── __tests__/          # Frontend tests
├── server/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── __tests__/          # Backend tests
├── docs/                   # Documentation
├── .github/                # Automation scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- [MongoDB Atlas URI](https://www.mongodb.com/products/platform/atlas-database)
- [National Park Service API key](https://www.nps.gov/subjects/developer/get-started.htm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kinskiwu/Trailblzrs.git
   cd Trailblzrs
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

   **In the root directory:**
   ```bash
   npm run dev
   ```
5. **Open your browser**

   Navigate to [`http://localhost:5173`](http://localhost:5173)

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/parks` | GET | Retrieve parks with pagination and filtering options |
| `/api/forecast` | GET | Get weather forecast for a park on a specific date |
| `/api/trips` | POST | Create a new trip |
| `/api/trips/:tripId` | GET | Retrieve a trip by ID |

## 🗯️ Design Decisions

- **Additional park data selected**: Park images and descriptions are included to provide additional content about the park, helping users select the ideal parks for their trip.

- **React + Express + JavaScript**: Chosen for rapid development and straightforward implementation for a small project. In a larger production environment, more robust languages and frameworks such as TypeScript, Nest.js, and Next.js might be a better fit.

- **MongoDB**: Chosen for rapid development and support for a flexible schema structure, such as park and forecast data. It also provides a simple TTL index feature, which can be utilized for infrequent caching. In a larger application or when efficiency is more important, an in-memory database such as Redis might be a better fit.

- **Embedded Park/Forecast Data in Trips**: Since park information and weather forecasts change over time, embedding the data in trip records preserves the exact information the user saw when planning.

## 📄 Design Documentation

- **Wireframes**: [Click here](https://balsamiq.cloud/slveto6/plezzeg/r2278)
- **API Design**: [Click here](docs/Trailblzrs-Api-Design.md)

## 🏁 Challenge Requirements Completion

### ✅ Completed Requirements

1. **Select Parks**
   - **By Location (State/Region)**: Implemented state filtering in both API and UI
   - **Park Selection**: UI allows selecting at least 5 parks for a trip

2. **Weather Forecasts**
   - **Temperature (High/Low)**: Implemented and displayed in the trip view
   - **Weather Conditions**: Implemented as "weather" field in forecast data
   - **Wind Speed**: Implemented and included in trip details

3. **Basic Sorting**
   - **By Name**: Parks can be sorted alphabetically
   - **By State**: Parks can be sorted by state code

4. **Trip Planning**
   - **Date Selection**: Users can select visit dates for parks
   - **7-Day View**: Trip details are organized by date
   - **Minimum Selection**: Enforces selection of at least 5 parks

5. **Basic Caching**
   - Parks are stored in MongoDB after retrieval to minimize API calls

6. **Testing**
   - Backend integration tests for parks and trips routes
   - Frontend integration tests for parks selection

### 🔄 Partially Completed

1. **Weather Data**
   - Three of the four required weather data points are implemented (missing humidity)

2. **Trip Updates**
   - Trip data structure and models are in place
   - Missing: The PUT /api/trips/:tripId backend endpoint for updating existing trips
   - Missing: Frontend UI for modifying trips after they've been created

### 📋 Future Features

- **Park Filtering**: Add support for filtering parks by activities, historical relevance, or weather conditions.

- **Park Sorting**: Implement advanced sorting options for parks by weather conditions, proximity to user location, or historical relevance.

- **Enhanced Weather Data**: Add humidity data to the weather forecast retrieval.

- **Improved Caching Strategy**: Implement caching system for external API responses to improve performance and reduce external API calls.

- **Google Maps Integration**: Add integration with Google Maps API.

- **Advanced Weather Customization**: Implement additional weather data options and customization features for trip planning.

- **Google Sheets Integration**: Add functionality to export trip data to Google Sheets, including an API endpoint and service for generating the required spreadsheet format.

- **Automated Data Pipeline**: Set up GitHub Actions to automate regular data retrieval from external APIs and update spreadsheets/databases with the latest information.

- **Unit Testing**: Implement unit tests for key services, controllers, and utility functions.

- **End-to-End Testing**: Implement E2E testing to verify complete API workflows and integration with external services.

- **Security Measures**: Add security enhancements including Helmet.js, and API authentication.

- **Request Validation**: Add comprehensive input validation using a library like Joi or express-validator.

- **Rate Limiting**: Implement rate limiting to protect the API from abuse and ensure fair usage.

- **Enhanced CORS Configuration**: Set up more robust CORS options with specific origin controls.

- **Centralized Error Handling**: Implement a global error handler middleware to process all errors consistently across the application.

- **Logging**: Implement structured logging for better debugging and monitoring capabilities.