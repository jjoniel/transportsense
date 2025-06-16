export type Phase = 
  | 'initialPhase' 
  | 'simulationStart' 
  | 'laneAdded' 
  | 'trafficReturns' 
  | 'paradoxExplanation'
  | 'simulationReset'
  | 'laneRemoved'
  | 'trafficGone'
  | 'solutionExplanation';

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
  initialPhase: {
    botText: "Welcome! This is a traffic simulation for a section of Washington D.C. Let's see how traffic forms. Press 'Start' to begin.",
    choices: [{ text: "Start Simulation", nextNode: "simulationStart" }],
  },
  simulationStart: {
    botText: "Traffic is building. As you can see, one road has become heavily congested (red), with nearby roads turning yellow. How should we address this?",
    choices: [{ text: "Add a Lane", nextNode: "laneAdded" }],
  },
  laneAdded: {
    botText: "A new lane has been added, and its stroke is now thicker. The traffic on that road has cleared up for now, turning green. Let's see what happens as the system adapts.",
    choices: [{ text: "Simulate", nextNode: "trafficReturns" }],
  },
  trafficReturns: {
    botText: "Interesting. After a short time, the 'improved' road is congested again. More drivers are using it, causing the same traffic jam. This is Induced Demand/Braess Paradox.",
    choices: [{ text: "Explain Why", nextNode: "paradoxExplanation" }],
  },
  paradoxExplanation: {
    botText: "Braess' paradox is where increasing the supply of something (like roads) makes people use it more. New lanes fill up quickly, returning congestion to previous levels or worse.",
    choices: [{ text: "Try Again", nextNode: "simulationReset" }],
  },
  simulationReset: {
    botText: "Let's try again.",
    choices: [{ text: "Remove Lane", nextNode: "laneRemoved" }],
  },
  laneRemoved: {
    botText: "You've removed a lane from the congested road. Let's see how traffic responds.",
    choices: [{ text: "Simulate", nextNode: "trafficGone" }],
  },
  trafficGone: {
    botText: "Removing a lane actually improved traffic flow and decreased congestion, a clear example of Braess' paradox at play. Congratulations on fixing the traffic.",
    choices: [{ text: "What Does This Tell Us About Urban Planning?", nextNode: "solutionExplanation" }],
  },
  solutionExplanation: {
    botText: "This paradox shows that simply adding lanes isn't always the answer. Smart urban planning considers how road changes affect driver behavior. Sometimes less road capacity leads to better traffic flow through better route distribution.",
    choices: [{ text: "Start Over", nextNode: "initialPhase" }],
  },
};