import { ChatOpenAI } from "@langchain/openai"; //chatgpt agent
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"; //google agent (free)
import { TavilySearchResults } from "@langchain/community/tools/tavily_search"; //a tool to allow internet use
import { MemorySaver } from "@langchain/langgraph"; //a memory storage module
import { HumanMessage, AIMessage } from "@langchain/core/messages"; //this allows both parties to talk
import { createReactAgent } from "@langchain/langgraph/prebuilt"; // a pre built re-act agent graph structure

//messages
const prompt = "";

//quick changer for different models
let num = 1;

//define which model i am using
let agentModel;
switch (num) {
  case 0:
    agentModel = new ChatOpenAI({ temperature: 0 });
    break;
  case 1:
    agentModel = new ChatGoogleGenerativeAI({ model: "gemini-2.0-flash" });
    break;
}

//define which tools my model can use
const agentTools = [new TavilySearchResults({ maxResults: 3 })];

//initialise memory, so the agent can remember past actions and messages
const agentCheckpointer = new MemorySaver();

//create the agent itself
const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointSaver: agentCheckpointer,
});

//initialise the agent
const finalResponse = await agent.invoke({ messages: [new HumanMessage(prompt)] }, { configurable: { thread_id: "42" } });
console.log(finalResponse.messages[finalResponse.messages.length - 1].content);
