# 🚞 Trailblzrs - National Park Road Trip Planner

Trailblzrs is a web application that helps users plan their road trips to US National Parks by providing park information, weather forecasts, and itinerary creation tools.

## ✨ Features

- **Park Discovery**: Browse and filter National Parks by location
- **Weather Integration**: View 7-day weather forecasts for each park
- **Trip Planning**: Create a 7-day itinerary with multiple parks

## 🛠️ Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: National Park Service API, National Weather Service API

## 📁 Project Structure

```
├── client/
│   ├── public/             # Static files
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── contexts/       # Context providers
│       └── mocks/          # Mock data
├── server/
│   └── src/
│       ├── config/         # Configuration files
│       ├── controllers/    # Route handlers
│       ├── models/         # MongoDB schemas
│       ├── routes/         # Routes
│       └── services/       # Business logic
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

## 🔌  API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/parks` | GET | Retrieve 6 parks at a time |
| `/api/forecast` | GET | Get weather forecast for a park on a specific date |
| `/api/trips` | POST | Create a new trip |
| `/api/trips/:tripId` | GET | Retrieve a trip by ID |

## 🗯️ Design Decisions

- **Additional data for rendering parks**: : I added more park details, such as images and descriptions, to enhance the user experience on the park discovery page.

- **React + Express + JavaScript**: Chosen for rapid development and straightforward implementation. This stack offers a good balance of flexibility and developer productivity for a project of this scope. In a larger production environment, additional tools like TypeScript or Next.js might be considered.

- **MongoDB**: Selected for two primary reasons:
  - The flexible schema accommodates the varying structure of trip data
  - Built-in TTL indexes provide simple document expiration for caching (Not yet implemented)

  While not as performant for caching as in memory DB like Redis, MongoDB offers a simpler architecture by keeping all data in one system.

- **Embedded Park/Forecast Data in Trips**: Since park information and weather forecasts change over time, embedding this data in trip records preserves the exact information the user saw when planning. This approach ensures historical accuracy of itineraries even when external data sources change.

## 📄 Design Documentation

- **Wireframes**: [Click here](https://balsamiq.cloud/slveto6/plezzeg/r2278)
- **API Design**: [Click here](docs/Trailblzers-Api-Design.md)

## 📈 Project Status

✅ **Completed**
- **Park Data Integration**: Implemented full-stack feature for fetching and NPS data with pagination
- **Weather Forecast Integration**: Implemented data retrieval from NWS API using park coordinates and visit date
- **Trip Management**: Created trip data modeling, implemented API endpoints for trip creation and retrieval
- **Itinerary Creation**: Implemented date selection (limited to 7 days), park selection, and forecast data retrieval

🔄 **In Progress**
- **Trip Updates**: Will take a bit longer as there are multiple steps to retrieve and combine park and forecast data for the trip
- **Data Caching**: Designed models for park data (7-day TTL) and forecast data (24-hour TTL) using MongoDB TTL feature

📋 **Backlog**
- **Park Filtering**: By location, activities, historical relevance, and weather conditions
- **Park Sorting**: By activity count, weather conditions, proximity, and historical significance
- **Google Sheets Integration**: Export trip itineraries with itinerary details

🍫 **Stretch Goals**
- Testing: the essential happy paths and edge cases such as parks and weather data fetching
- Enhanced Data Validation: Implementing validation to handle user inputs and API responses gracefully
- Authentication: Adding secure authentication would allow personalized trip planning and saving favorites
- Smart Automation: Setting up scheduled data fetching after TTL expirations and creating event-driven Google Sheet updates when parks have alerts or closures
- Interactive Maps: Integrating Google Maps would provide visual trip planning and route optimization
- Traveler-Focused Details: Adding vital information travelers need like park alerts, parking availability, camping options, and entry fees

📝 **Additional Notes**
I've created simple tickets to plan out the project and smaller PRs to record my progress. Since it's a solo project with time constraints, in a real-world scenario I would have:
- Asked clarifying questions before design
- Created more thorough EPICs and user stories with detailed tickets
- Included more details in PRs

Overall I really enjoyed this process (I love hiking 🥾) and learned a lot from it! Thanks for this invitation!