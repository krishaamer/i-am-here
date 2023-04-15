from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import CharacterTextSplitter
from langchain import OpenAI, VectorDBQA
from langchain.document_loaders import DirectoryLoader


llm = OpenAI(temperature=0)
embedding = OpenAIEmbeddings()

def load_documents(directory = "./data/",  glob='ethglobal*', collection_name):
    loader = DirectoryLoader(directory, glob=glob)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=0
            )
    texts = text_splitter.split_documents(documents)

    docsearch = Chroma.from_documents(texts, embedding,
                                  persist_directory=persist_directory,
                                  collection_name=collection_name
                                  )
    docsearch.persist()
    return collection_name


def init_qa():
    qa = VectorDBQA.from_chain_type(llm=OpenAI(),
                chain_type="stuff",
                vectorstore=docsearch)
    qa.run("what are polygon events in 2023")
