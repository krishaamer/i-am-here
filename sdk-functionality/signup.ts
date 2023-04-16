import * as dotenv from "dotenv";

import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI, ChainTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  CharacterTextSplitter,
  RecursiveCharacterTextSplitter,
} from "langchain/text_splitter";
import * as fs from "fs";
dotenv.config();
const model = new OpenAI({ temperature: 0 });

const initChain = async (
  source_file: string = "./../data/sideevents/sideevents.txt",
  folder: string
) => {
  /* Create the vectorstore */
  let vectorStore: HNSWLib | undefined = undefined;
  /* Load in the file we want to do question answering over */
  const embeddings = new OpenAIEmbeddings();
  try {
    vectorStore = await HNSWLib.load("./tmp" + folder, embeddings);
  } catch (e) {
    console.log("Could not load vector store, creating new one");
    const text = fs.readFileSync(source_file, "utf8");
    /* Split the text into chunks */
    const textSplitter = new CharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await textSplitter.createDocuments([text]);
    vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
    console.log("Complete");
    await vectorStore.save("./tmp/" + folder);
  }
  if (!vectorStore) throw new Error("Vector store not defined");
  /* Create the chain */
  const chain = VectorDBQAChain.fromLLM(model, vectorStore);

  return chain;
};
const main = async () => {
  console.log("hi");
  const qaEvents = await initChain(
    "./../data/sideevents/sideevents.txt",
    "sideevents"
  );
  const qaEventsTool = new ChainTool({
    name: "events-list-qa",
    description:
      "Events calendar QA - useful for when you need to ask questions about the current events.",
    chain: qaEvents,
  });
  const tools = [qaEventsTool];
  const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description",
    true
  );
  // const qaPrizes = await initChain("./../data/ethglobal/prizes.txt", "prizes");
  const data = await qaEvents.run("What de-fi event is happening?");
  console.log(data);
  // console.log("end");
};

main();
