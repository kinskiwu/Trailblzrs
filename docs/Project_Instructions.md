# 🌲 Corporate Systems Engineer Code Challenge
## National Parks Road Trip Planner 🚗🗺️

Why This Challenge?

We’ve designed this challenge to test core skills like API integration, data processing, and automation without relying on environment-specific knowledge. While we could provide more task-specific challenges, access to internal systems like Okta, Google Workspace, GCP, JAMF, Jira, Salesforce, etc. can’t be shared externally.

Instead, this project uses publicly accessible APIs to simulate the same skill sets our engineers use daily—like:

- Working with APIs: Authenticated and unauthenticated.
- Transforming and structuring data: As part of a broader workflow.
- Automating routine tasks: Just as we automate processes across internal tools.

The goal isn't to test familiarity with our exact tools, but rather your ability to:

- Understand unfamiliar APIs.
- Think through data flow and automation problems.
- Produce clean, maintainable, and effective code.

Note: We’re not expecting 100% completion or perfection. Work around bugs as encountered, and demonstrate how you approached challenges along the way.

## National Parks Road Trip Planner 🚗🗺️

Your task? Build a **National Parks Road Trip Planner** that:

- Selects parks based on a chosen filter.
- Retrieves live, date-specific weather for each park visit.
- Generates an itinerary for a one-week trip.
- Pushes the results to a Google Sheet.

---

## 🛠️ Challenge Steps

### 1️⃣ Select Parks

Choose one or more filters (supported by the NPS API):

- 📍 By Location (State/Region)
- 🛶 By Activities (e.g., hiking, kayaking)
- 📅 By Historical Relevance (e.g., historic sites)
- 🌤️ By Forecasted Weather (from the weather API for the visit date)
- 🎯 Choose Your Own: Select by any other retrieved data that makes sense for a trip. (Explain your logic in the README.)

✅ Minimum: 5 parks.
🗺️ Trip Duration: 7 days.

---

### 2️⃣ Retrieve Live Weather Forecasts

- Use the National Weather Service API (default) to retrieve forecasted weather for each park’s visit date.
- Weather data should include:
  - 🌡️ Temperature (High/Low)
  - 🌤️ Conditions (e.g., sunny, cloudy)
  - 💨 Wind Speed (mph)
  - 💧 Humidity (%)

---

### 3️⃣ Sort Parks

Choose one sorting option based on the traveler's goal:

- 🌤️ Sunniest Trip: Sort by weather forecast to prioritize parks with the best conditions. (Sunny skies, mild temps, low wind.)
- 🛶 Most Activities: Sort by available activities to maximize adventure. (More hiking, kayaking, and exploration.)
- 📍 Shortest Route: Sort by proximity to the starting park to minimize driving time. (Less driving, more exploring.)
- 📅 Historic Highlights: Sort by historical relevance to focus on parks with cultural or historical significance. (Perfect for history lovers.)
- 🎯 Choose Your Own: Sort by any other retrieved data that makes sense for a road trip. (Explain your logic in the README.)

---

### 4️⃣ Generate a One-Week Itinerary

- Assign each park to a specific day within a 7-day window.
- Include the weather forecast for the visit date.
- Since forecasts are only available for the next 7 days, ensure visits are scheduled within that window.

---

### 5️⃣ Push Results to a Google Sheet

- Generate a Google Sheet with at least the following columns:

```
| Order | Park Name         | State | Visit Date | Forecast High | Forecast Low | Weather | Wind Speed | NPS Link                        | Directions |
|-------|-------------------|-------|------------|----------------|---------------|---------|------------|--------------------------------|------------|
| 1     | Yosemite NP       | CA    | 2025-02-20 | 72°F          | 45°F         | Sunny   | 5 mph      | https://www.nps.gov/yose       | See URL    |
```

---

## 🌟 Bonus Challenges

- 🛠️ GitHub Actions: Automate data retrieval & sheet updates.
- 🗺️ Google Maps: Generate a road trip map for the parks.
- ☁️ Weather Customization: Allow user-defined weather preferences.
- 🚦 Caching: Implement basic caching to reduce API calls.
- Surprise Us! Something else relevant or fun you want to include? We’d love to see it and talk to you about it.

---

## 📂 How to Submit

1. Fork this repository on GitHub.
2. Create a new branch for your implementation.
3. Commit your code with clear messages.
4. Push your branch to GitHub.
5. Create a pull request (PR) to submit your solution.
6. Include a README explaining your approach.

---

## 🔍 Evaluation Criteria

| Category             | Criteria                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| Functionality        | Queries APIs, retrieves parks & weather, generates itinerary, and writes results to Google Sheets |
| API Integration      | Properly retrieves date-specific weather forecasts                                                |
| Error Handling       | Manages missing data, API failures, and rate limits gracefully                                    |
| Code Quality         | Clean, modular, well-documented code                                                              |
| GitHub Practices     | Effective use of commits, branching, and PRs                                                      |
| Bonus                | Implements GitHub Actions, Maps integration, or custom weather options                            |

---

Good luck, and happy coding! 🚀🌲

