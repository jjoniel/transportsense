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
      "Welcome! This is a traffic flow simulation of a small area of Washington D.C. Press 'Start Simulation' to begin.",
    choices: [{ text: "Start Simulation", nextNode: "simulationStart" }],
  },
  simulationStart: {
    botText:
      "Simulation started. Traffic conditions are forming on the roads...",
    choices: [{ text: "Continue", nextNode: "trafficBuilds" }],
  },
  trafficBuilds: {
    botText:
      "Traffic is building up. Roads are turning yellow, orange... and now one road has turned red.",
    choices: [{ text: "Continue", nextNode: "addLanePrompt" }],
  },
  addLanePrompt: {
    botText:
      "A traffic jam has occurred. Would you like to add a lane to the red road?",
    choices: [{ text: "Add a lane", nextNode: "laneAdded" }],
  },
  laneAdded: {
    botText:
      "A lane has been added. The road is now wider and the simulation continues.",
    choices: [{ text: "Continue", nextNode: "trafficReturns" }],
  },
  trafficReturns: {
    botText:
      "Despite the new lane, the same road is red again. This is explained by induced demand. Metrics updated with AI-calculated traffic flow.",
    choices: [
      { text: "Add another lane", nextNode: "laneAdded" },
      { text: "Learn more", nextNode: "inducedDemandExplanation" },
    ],
  },
  inducedDemandExplanation: {
    botText:
      "Studies show that adding freeway lane miles often leads to increased traffic. Let's explore alternative solutions.",
    choices: [{ text: "Explore Alternatives", nextNode: "alternatives" }],
  },
  alternatives: {
    botText:
      "Here are some issues and solutions from transportation studies: better public transit, demand management, and urban planning guidelines.",
    choices: [{ text: "Start over", nextNode: "root" }],
  },
};
