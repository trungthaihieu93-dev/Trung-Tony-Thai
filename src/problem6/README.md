## Flow Diagram with Mermaid.js

```bash
flowchart TD
    UserAction[User completes an action on the website] --> APICall[Client sends score update request to API]
    APICall --> AuthCheck{Authenticated?}
    AuthCheck -- No --> ErrorResp[Reject request (401 Unauthorized)]
    AuthCheck -- Yes --> UpdateScore[Update user's score in the database]
    UpdateScore --> Top10[Compute updated top 10 leaderboard]
    Top10 --> ChangeCheck{Top 10 changed?}
    ChangeCheck -- No --> NoUpdate[No leaderboard update needed]
    ChangeCheck -- Yes --> Broadcast[Broadcast new top 10 to clients via WebSocket/SSE]
    Broadcast --> LiveClients[Connected clients receive update message]
    LiveClients --> UIUpdate[Browser updates the displayed scoreboard]
```
