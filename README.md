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

   **In the root directory:**
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

- **Additional park data selected**: Park images and descriptions are included to provide additional content about the park, helping users select the ideal parks for their trip.

- **React + Express + JavaScript**: Chosen for rapid development and straightforward implementation for a small project. In a larger production environment, more robust languages and frameworks such as TypeScript, Nest.js, and Next.js might be a better fit.

- **MongoDB**: Chosen for rapid development and support for a flexible schema structure, such as park and forecast data. It also provides a simple TTL index feature, which can be utilized for infrequent caching. In a larger application or when efficiency is more important, an in-memory database such as Redis might be a better fit.

- **Embedded Park/Forecast Data in Trips**: Since park information and weather forecasts change over time, embedding the data in trip records preserves the exact information the user saw when planning.

## 📄 Design Documentation

- **Wireframes**: [Click here](https://balsamiq.cloud/slveto6/plezzeg/r2278)
- **API Design**: [Click here](docs/Trailblzers-Api-Design.md)

## 📈 Project Status

✅ **Completed**
- **NPS API Integration**: Implemented full-stack functionality for parks data fetching capability with pagination.
- **NWS API Integration**: Implemented full backend and partial frontend forecast data retrieval with park coordinates and visit date. The frontend makes the requests and receives the data, but the state management and data integration are still work in progress.
- **Trip Management**: Completed partial backend functionalities, including Trip schema, API endpoints for trip creation and trip retrieval.

🔄 **In Progress**
- **Caching**: Designed/Created Park and Forecast schemas.

📋 **Backlog**
- **Trip Management**: Backend trip update endpoint, frontend integration with backend.
- **Park Filtering**: By location, activities, historical relevance, and weather conditions.
- **Park Sorting**: By activity count, weather conditions, proximity, and historical significance.
- **Google Sheets Integration**: Export trip itineraries with itinerary details.

🍫 **Stretch Goals**
- The essential happy paths and edge cases such as parks and weather data fetching.
- Implement validation to handle user inputs and API responses gracefully.
- Authentication.
- Automation for scheduling data fetching after TTL expirations, event-driven Google Sheets updates when parks have alerts or extreme weather conditions.
- Integrate Google Maps to provide visual trip planning and route optimization.
- Add additional information travelers need, such as park alerts, parking availability, camping options, and entry fees.

📝 **Additional Notes**
I've created simple tickets to plan out the project and smaller PRs to record my progress. Since it's a solo project with time constraints, in a real-world scenario I would have:
- Asked clarifying questions before design.
- Created more thorough EPICs and user stories with detailed tickets.
- Included more details in PRs.

Overall, I really enjoyed this process (I love hiking 🥾) and learned a lot from it! Thanks for this invitation!

💪 **Enhanced Features**