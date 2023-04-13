import { PineconeClient } from "@pinecone-database/pinecone";

const pinecone = new PineconeClient();
await pinecone.init({
  environment: "YOUR_ENVIRONMENT", // need to get this from Pinecone and add to .env
  apiKey: "PINECONE_API_KEY",
});

export default pinecone;
