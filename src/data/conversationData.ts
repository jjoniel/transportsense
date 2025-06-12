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
      "Welcome! This is a simulation of the city's traffic flow. What would you like to do?",
    choices: [{ text: "Add a lane", nextNode: "addLaneResponse" }],
  },
  addLaneResponse: {
    botText: "Added a lane.",
    choices: [
      { text: "Add another lane", nextNode: "addLaneResponse" },
      { text: "Start over", nextNode: "root" },
    ],
  },
};
