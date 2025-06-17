## 🚦 TransportSense – AI in Action Hackathon

**TransportSense** is an interactive AI-powered traffic simulator that helps users understand urban congestion and **Braess’ Paradox** by letting them add or remove roads and watch how traffic metrics (like travel time, fuel waste, and congestion cost) change in real time. 

Unlike traditional traffic simulators, TransportSense makes _complex traffic issues_ like Braess' Paradox _understandable to the public_ through real-time AI explanations.

TransportSense empowers anyone to understand and predict the _hidden consequences_ of urban planning decisions—**making smarter, more sustainable cities possible.**

### 🛠️ Tech + Tools Used

**Google Cloud:**
- **Vertex AI + Gemini 2.0 Flash** – Guides the user step-by-step to help them fix a highly congested portion of Washington, D.C, generating natural-language explanations of traffic changes, and teaching users about real-world traffic dynamics like **Braess' Paradox** and **induced demand**.
- **Cloud Run** – hosts our **NextJS app** as a scalable containerized web app

**MongoDB Atlas:**
- Stores real-world transportation data sourced from the following public dataset and report:
  - [Transportation For America: The Congestion Con (we store Table I from the report)](https://t4america.org/wp-content/uploads/2020/03/Congestion-Report-2020-FINAL.pdf)
  - [Texas A&M Transportation Institute: Base Statistics from the 2023 Urban Mobility Report](https://mobility.tamu.edu/umr/report/)
- We use the data for Washington, D.C. from both data sources to calculate and persist updated traffic metrics based on the user actions (adding/removing roads) and our dynamic traffic simulation. These are the main metrics we track:
  - Average delay per mile
  - Average travel time per mile
  - Annual excess fuel wasted
  - Annual congestion cost
 - We created embeddings and used **MongoDB Atlas' Vector Search** to help us find and compare similar traffic patterns.

### 🔗 Submission Links
- **Devpost**: [put our devpost submission link here](https://ai-in-action.devpost.com)  
- **Demo Video**: [put our demo vid link here](https://ai-in-action.devpost.com)

