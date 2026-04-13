import { NextRequest, NextResponse } from "next/server";
import { chatWithNFTAssistant, generateNFTDescription, suggestNFTPrice } from "@/app/lib/langchain-nft-assistant";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, action } = body;

    switch (action) {
      case "chat":
        const chatResponse = await chatWithNFTAssistant(messages);
        return NextResponse.json({ 
          success: true, 
          response: chatResponse 
        });

      case "generate-description":
        if (!body.nftData) {
          return NextResponse.json(
            { success: false, error: "NFT data required" },
            { status: 400 }
          );
        }
        const description = await generateNFTEsc NFTDescription(body.nftData);
        return NextResponse.json({ 
          success: true, 
          description 
        });

      case "suggest-price":
        if (!body.nftData) {
          return NextResponse.json(
            { success: false, error: "NFT data required" },
            { status: 400 }
          );
        }
        const priceSuggestion = await suggestNFTPrice(body.nftData);
        return NextResponse.json({ 
          success: true, 
          suggestion: priceSuggestion 
        });

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("LangChain API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
