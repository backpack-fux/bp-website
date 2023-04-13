import { ChatOpenAI } from "langchain/chat_models";

const chatBot = new ChatOpenAI({ temperature: 0 });

export default chatBot;