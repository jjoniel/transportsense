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
    botText: "A new lane has been added — the road looks wider now (thicker stroke) and has temporarily cleared up (green). But let's see how drivers adapt.",
    choices: [{ text: "Simulate", nextNode: "trafficReturns" }],
  },
  trafficReturns: {
    botText: "Interesting. After a short time, that 'improved' road is congested again. Drivers shifted to the new lane thinking it's faster — but it caused the same traffic jam. This is an example of Induced Demand, also known as Braess' Paradox.",
    choices: [{ text: "Explain Why", nextNode: "paradoxExplanation" }],
  },
  paradoxExplanation: {
    botText: "Braess' Paradox is a counterintuitive idea where adding road capacity (like a new lane) encourages more people to use it — so much that it slows everyone down, sometimes even making traffic worse than before. Government's/urban planners may be wasting money and hurting commutes by not accounting for Braess's Paradox",
    choices: [{ text: "Try Again", nextNode: "simulationReset" }],
  },
  simulationReset: {
    botText: "“Let's try a different approach. This time, we'll remove a lane and see what happens. The simulation has been reset to its starting point.",
    choices: [{ text: "Remove Lane", nextNode: "laneRemoved" }],
  },
  laneRemoved: {
    botText: "You've removed a lane. The road now appears narrower. Let's simulate and see what happens next",
    choices: [{ text: "Simulate", nextNode: "trafficGone" }],
  },
  trafficGone: {
    botText: "Surprising, right? Traffic has actually improved — congestion is gone, and flow is smoother. Removing the lane helped reroute drivers more efficiently. This is Braess' Paradox in action",
    choices: [{ text: "What Does This Tell Us About Urban Planning?", nextNode: "solutionExplanation" }],
  },
  solutionExplanation: {
    botText: "Sometimes, building more roads isn't the solution. Governments/urban planners must consider how people react to changes. Counterintuitively, reducing road capacity can sometimes lead to better outcomes for traffic flow.",
    choices: [{ text: "Start Over", nextNode: "initialPhase" }],
  },
};