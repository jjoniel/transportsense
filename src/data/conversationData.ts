export type Choice = {
  text: string;
  nextNode: string;
};

export type ConversationNode = {
  botText: string;
  choices: Choice[];
};

export type ConversationTree = {
  [key: string]: ConversationNode;
};

export const conversationTree: ConversationTree = {
  root: {
    botText:
        "Welcome! This is a traffic simulation for a section of Washington D.C. Let's see how traffic forms. Press 'Start' to begin.",
    choices: [{ text: "Start Simulation", nextNode: "simulationStart" }],
  },
  simulationStart: {
    botText:
        "Traffic is building. As you can see, one road has become heavily congested (red), with nearby roads turning yellow. How should we address this?",
    choices: [
      { text: "Add a new lane to the red road", nextNode: "laneAdded" },
    ],
  },
  laneAdded: {
    botText:
        "A new lane has been added, and its stroke is now thicker. The traffic on that road has cleared up for now, turning green. Let's see what happens as the system adapts.",
    choices: [{ text: "Continue", nextNode: "trafficReturns" }],
  },
  trafficReturns: {
    botText:
        "Interesting. After a short time, the 'improved' road is congested again. More drivers are using it, causing the same traffic jam. This is 'Induced Demand'.",
    choices: [
      { text: "Learn about Induced Demand", nextNode: "inducedDemandExplanation" },
      { text: "Add another lane anyway", nextNode: "laneAddedAgain" },
    ],
  },
  laneAddedAgain: {
    botText:
        "You've added another lane, but the problem persists. Adding road capacity often just invites more cars, without solving the root cause of congestion.",
    choices: [
      { text: "Explore real solutions", nextNode: "alternatives" },
      { text: "Start Over", nextNode: "root" },
    ],
  },
  inducedDemandExplanation: {
    botText:
        "Induced demand is where increasing the supply of something (like roads) makes people use it more. New lanes fill up quickly, returning congestion to previous levels or worse.",
    choices: [
      { text: "What are the alternatives?", nextNode: "alternatives" },
    ],
  },
  alternatives: {
    botText:
        "Effective solutions focus on managing demand and providing other options, like improving public transit, creating dedicated bike lanes, or congestion pricing. These strategies move more people, not just more cars.",
    choices: [{ text: "Start Over", nextNode: "root" }],
  },
};