/**
 * LangChain NFT Assistant Agent
 * AI-powered assistant for the DEFUK NFT marketplace
 */

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { StructuredTool, Tool } from "@langchain/core/tools";
import { z } from "zod";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// NFT Market Data Interface
export interface NFTMarketData {
  totalVolume: number;
  totalItems: number;
  totalOwners: number;
  floorPrice: number;
  recentSales: Array<{
    id: string;
    price: number;
    timestamp: Date;
  }>;
}

// LangChain Tools for NFT Assistant
class NFTSearchTool extends Tool {
  name = "nft_search";
  description = "Search for NFTs in the DEFUK marketplace by name, type, or price range";

  schema = z.object({
    query: z.string().describe("Search query (e.g., 'lobster', 'bubble', 'under 0.1 ETH')"),
    limit: z.number().default(10).describe("Number of results to return"),
  });

  async _call(input: { query: string; limit: number }): Promise<string> {
    // In production, connect to actual NFT database
    const mockResults = [
      { id: "1", name: "DEFUK Lobster #001", price: 0.15, type: "lobster" },
      { id: "2", name: "DEFUK Lobster #042", price: 0.12, type: "lobster" },
      { id: "3", name: "DEFUK Bubble #089", price: 0.08, type: "bubble" },
    ];

    return JSON.stringify(mockResults.slice(0, input.limit), null, 2);
  }
}

class NFTPriceTool extends Tool {
  name = "nft_price_check";
  description = "Check current price and market status of a specific NFT";

  schema = z.object({
    nftId: z.string().describe("NFT ID or name (e.g., 'DEFUK Lobster #001')"),
  });

  async _call(input: { nftId: string }): Promise<string> {
    // In production, fetch from blockchain/contract
    const mockPrice = {
      id: input.nftId,
      currentPrice: 0.15,
      lastSale: 0.12,
      floorPrice: 0.089,
      isListed: true,
      currency: "ETH",
    };
    return JSON.stringify(mockPrice, null, 2);
  }
}

class NFTRecommendationTool extends Tool {
  name = "nft_recommendation";
  description = "Get personalized NFT recommendations based on user preferences and budget";

  schema = z.object({
    budget: z.number().describe("User's budget in ETH"),
    type: z.string().describe("NFT type preference (lobster, bubble, claw, etc.)"),
    rarity: z.string().optional().describe("Preferred rarity level"),
  });

  async _call(input: { budget: number; type: string; rarity?: string }): Promise<string> {
    // In production, use ML model for recommendations
    const recommendations = [
      { id: "1", name: "DEFUK Lobster #042", price: 0.12, matchScore: 0.95 },
      { id: "2", name: "DEFUK Lobster #156", price: 0.10, matchScore: 0.88 },
    ];
    return JSON.stringify(recommendations, null, 2);
  }
}

// Create LangChain Chatbot with Tools
export async function createNFTAssistant() {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const tools = [
    new NFTSearchTool(),
    new NFTPriceTool(),
    new NFTRecommendationTool(),
  ];

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are DEFUK NFT Assistant, an AI expert for the DEFUK NFT marketplace on the TOKI network.

You can help users with:
- Searching for NFTs in the marketplace
- Checking prices and market status
- Providing personalized recommendations
- Explaining NFT features and rarity
- Answering questions about minting, trading, and collecting

Always be friendly, helpful, and provide accurate information from the tools available.
Keep responses concise but informative.

Use tools when you need to fetch real data about NFTs, prices, or recommendations.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
    ["placeholder", "{agent_scratchpad}"],
  ]);

  const agent = prompt | llm | tools;

  return agent;
}

// Simple Chat API without tools (for basic Q&A)
export async function chatWithNFTAssistant(messages: Array<{ role: string; content: string }>): Promise<string> {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are DEFUK NFT Assistant, an AI expert for the DEFUK NFT marketplace.
Help users with questions about NFTs, minting, trading, and collecting.
Be friendly, concise, and helpful.

Key facts about DEFUK:
- Built on TOKI network
- Fresh seafood-quality NFTs
- Ocean-themed: Lobsters, Bubbles, Claws
- Low fees and fast trading
- Community-driven marketplace

Always provide helpful, accurate, and engaging responses!`,
    ],
    ...messages.map((msg) => [msg.role, msg.content] as [string, string]),
  ]);

  const chain = prompt | llm | new StringOutputParser();

  const response = await chain.invoke({});

  return response;
}

// NFT Description Generator
export async function generateNFTDescription(nftData: {
  name: string;
  type: string;
  rarity: string;
  features: string[];
}): Promise<string> {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a creative NFT copywriter for DEFUK marketplace.
Write catchy, engaging NFT descriptions that highlight the unique features.
Keep it under 200 characters.
Use emojis when appropriate.
Make it sound fresh and ocean-themed!`,
    ],
    [
      "human",
      `Generate a description for:
Name: ${nftData.name}
Type: ${nftData.type}
Rarity: ${nftData.rarity}
Features: ${nftData.features.join(", ")}`,
    ],
  ]);

  const chain = prompt | llm | new StringOutputParser();
  const description = await chain.invoke({});

  return description.trim();
}

// NFT Pricing Suggester
export async function suggestNFTPrice(nftData: {
  type: string;
  rarity: string;
  floorPrice: number;
  lastSalePrice: number | null;
  traits: number;
}): Promise<string> {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.2,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an NFT pricing expert for DEFUK marketplace.
Provide a reasonable price suggestion in ETH based on market data.
Be conservative and competitive.
Explain your reasoning briefly.`,
    ],
    [
      "human",
      `NFT Data:
- Type: ${nftData.type}
- Rarity: ${nftData.rarity}
- Floor Price: ${nftData.floorPrice} ETH
- Last Sale: ${nftData.lastSalePrice ? `${nftData.lastSalePrice} ETH` : 'None'}
- Traits: ${nftData.traits}

Suggest a competitive price and explain why.`,
    ],
  ]);

  const chain = prompt | llm | new StringOutputParser();
  const suggestion = await chain.invoke({});

  return suggestion.trim();
}

// Market Analysis
export async function analyzeMarketTrends(): Promise<string> {
  const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.3,
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are a market analyst for DEFUK NFT marketplace.
Provide insights on current market trends based on typical patterns.
Be realistic and helpful for collectors and traders.`,
    ],
    [
      "human",
      `Analyze current market trends for DEFUK NFTs:
- Lobster NFTs are the main collection
- Floor price is around 0.089 ETH
- Total volume shows healthy trading
- Community is growing

What should collectors know? What's good for trading?`,
    ],
  ]);

  const chain = prompt | llm | new StringOutputParser();
  const analysis = await chain.invoke({});

  return analysis.trim();
}

export default {
  createNFTAssistant,
  chatWithNFTAssistant,
  generateNFTEsc NFTDescription,
  suggestNFTPrice,
  analyzeMarketTrends,
};
