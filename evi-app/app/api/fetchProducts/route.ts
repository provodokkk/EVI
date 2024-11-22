import { NextResponse } from "next/server";
import { fetchProducts } from "../../../utils/fetchProducts";
import { getTopEmotions, generateResponseMessage } from "./helperFunctions";

interface EmotionScores {
  [key: string]: number;
}

interface RequestBody {
  parameters?: string;
  emotionScores?: EmotionScores;
  searchTerm?: string;
}

async function handleRequest(request: Request) {
  console.log("--- fetchProducts API route started ---");

  const { searchTerm, emotionScores } = await getData(request);

  if (!searchTerm) {
    return NextResponse.json(
      { success: false, error: "Search term is required" },
      { status: 400 }
    );
  }

  try {
    console.log("Calling fetchProducts function...");
    const result = await fetchProducts(JSON.stringify({ searchTerm }));
    const responseMessage = generateResponseMessage(result, emotionScores);
    const products = result.data?.products || [];

    if (result.data) {
      result.data.products = addMockDataToProducts(products, searchTerm);
      console.log(result.data.products);
    }

    return NextResponse.json({
      ...result,
      responseMessage,
    });
  } catch (error) {
    console.error("Error in fetchProducts route:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        responseMessage:
          "I'm sorry, but there was an error while searching for products. Please try again later.",
      },
      { status: 500 }
    );
  } finally {
    console.log("--- fetchProducts API route finished ---");
  }
}

async function getData(request: Request): Promise<{
  searchTerm: string | null;
  emotionScores: Array<{ emotion: string; value: number }> | null;
}> {
  try {
    let searchTerm: string | null = null;
    let emotionScores: Array<{ emotion: string; value: number }> | null = null;

    if (request.method === "POST") {
      const contentType = request.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const body: RequestBody = await request.json();

        emotionScores = getTopEmotions(body.emotionScores);

        searchTerm = body.parameters
          ? JSON.parse(body.parameters).searchTerm
          : body.searchTerm;
      }
    }
    return { searchTerm, emotionScores };
  } catch (error) {
    console.error("Error parsing request body:", error);
    return { searchTerm: null, emotionScores: null };
  }
}

export async function GET(request: Request) {
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}

function addMockDataToProducts(
  products: Array<any>,
  searchTerm: string
): Array<any> {
  return products.map((product: any) => {
    const updatedProduct = addLocalFlag(product);

    // Add CO2 emissions only for batteries
    if (searchTerm.toLowerCase().includes("batter")) {
      updatedProduct.co2Emissions = generateRandomCO2Emissions();
    }

    return updatedProduct;
  });
}

// Function to generate random data about the place of production
function addLocalFlag(product: any): any {
  return { ...product, isLocal: Math.random() < 0.5 };
}

// Function to generate random CO2 emissions within a range
function generateRandomCO2Emissions(): string {
  const randomValue = (Math.random() * (5 - 0.5) + 0.5).toFixed(2);
  return `${randomValue} kg CO2`;
}
