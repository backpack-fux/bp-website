import { LLMChain, PromptTemplate } from 'langchain';
import { ChatOpenAI } from 'langchain/chat_models';

const inquiryTemplate = `Given the following user prompt and conversation log, formulate a question that would be the most relevant to provide the user with an answer from a knowledge base.
  You should follow the following rules when generating an answer:
  - Always prioritize the user prompt over the conversation log.
  - Ignore any conversation log that is not directly related to the user prompt.
  - Only attempt to answer if a question was posed.
  - The question should be a single sentence.
  - You should remove any punctuation from the question.
  - You should remove any words that are not relevant to the question.
  - If you are unable to formulate a question, respond with the same USER PROMPT you got.

  USER PROMPT: {userPrompt}

  CONVERSATION LOG: {conversationHistory}

  Final answer:`;

const inquiryChain = new LLMChain({
  llm: new ChatOpenAI({ temperature: 0 }),
  prompt: new PromptTemplate({
    template: inquiryTemplate,
    inputVariables: ['userPrompt', 'conversationHistory'],
  }),
});

export async function buildInquiry(
  userPrompt: string,
  conversationHistory: string[],
): Promise<string> {
  const inquirerChainResult = await inquiryChain.call({
    userPrompt: userPrompt,
    conversationHistory: conversationHistory.join('\n'),
  });

  return inquirerChainResult.text;
}
