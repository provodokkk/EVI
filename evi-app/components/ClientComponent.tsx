"use client";
import { VoiceProvider, ToolCallHandler } from "@humeai/voice-react";
import Messages from "./Controls";
import Controls from "./Messages";
import StartCall from "./StartCall";

type ErrorDetails = {
  error: string;
  code: string;
  level: string;
  content: string;
};

const ERROR_MESSAGES = {
  toolNotFound: {
    error: "Tool not found",
    code: "tool_not_found",
    level: "warn",
    content: "The tool you requested was not found.",
  },
  fetchProductsError: {
    error: "Failed to fetch products",
    code: "fetch_products_error",
    level: "warn",
    content: "There was an issue fetching the products.",
  },
  productNotFound: {
    error: "Product open error",
    code: "product_open_error",
    level: "warn",
    content: "The product you asked to open was not found.",
  },
};

const sendError = (send: any, error: ErrorDetails) => {
  send.error(error);
};

const fetchProducts = async (message: any, send: any) => {
  try {
    const emotionScores = localStorage.getItem("emotionScores");
    const emotionScoresParsed = emotionScores ? JSON.parse(emotionScores) : {};

    const response = await fetch("/api/fetchProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parameters: message.parameters,
        emotionScores: emotionScoresParsed,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    localStorage.setItem("productList", JSON.stringify(result.data.products));
    return send.success(result);
  } catch (error) {
    return sendError(send, ERROR_MESSAGES.fetchProductsError);
  }
};

const openProduct = (message: any, send: any) => {
  const productList = JSON.parse(localStorage.getItem("productList") || "[]");
  const { productIndex } = JSON.parse(message.parameters);

  console.log(productList)
  console.error(productIndex)
  console.error(productList[productIndex])

  if (productList[productIndex]?.productUrl) {
    window.open(productList[productIndex].productUrl, "_blank");
    return send.success({ message: "Opening the product" });
  }

  return sendError(send, ERROR_MESSAGES.productNotFound);
};

const handleToolCall: ToolCallHandler = async (message: any, send: any) => {
  const allowedTools = new Set(["fetch_products", "open_product"]);

  if (!allowedTools.has(message.name)) {
    return sendError(send, ERROR_MESSAGES.toolNotFound);
  }

  if (message.name === "fetch_products") return fetchProducts(message, send);
  if (message.name === "open_product") return openProduct(message, send);
};

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
  if (!configId) return <div>Error: Missing Config ID</div>;

  return (
    <VoiceProvider
      configId={configId}
      auth={{ type: "accessToken", value: accessToken }}
      onToolCall={handleToolCall}
    >
      <Messages />
      <Controls />
      <StartCall />
    </VoiceProvider>
  );
}
