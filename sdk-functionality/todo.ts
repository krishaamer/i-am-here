import * as dotenv from "dotenv";

import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, ChainTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
dotenv.config();

export const initChain = async () => {
  /* Create the vectorstore */
  let vectorStore: HNSWLib | undefined = undefined;
  const model = new OpenAI({ temperature: 0 });
  /* Load in the file we want to do question answering over */
  const embeddings = new OpenAIEmbeddings();
  try {
    vectorStore = await HNSWLib.load("./tmp", embeddings);
  } catch (e) {
    console.log("Could not load vector store, creating new one");
    const text = fs.readFileSync("./../data/ethglobal/prizes.txt", "utf8");
    /* Split the text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text]);
    vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
    console.log("Complete");
    await vectorStore.save("./tmp");
  }
  if (!vectorStore) throw new Error("Vector store not defined");
  /* Create the chain */
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);
  const qaTool = new ChainTool({
    name: "state-of-union-qa",
    description:
      "State of the Union QA - useful for when you need to ask questions about the most recent state of the union address.",
    chain: chain,
  });
  return chain;
};
