import { readFileSync } from "fs";
import * as R from "remeda";

// Helper function to extract and sort top 3 emotions
export function getTopEmotions(
  emotionScores?: Record<string, number>
): Array<{ emotion: string; value: number }> | null {
  if (!emotionScores) return null;

  return R.pipe(
    emotionScores,
    R.entries(),
    R.sortBy(R.pathOr([1], 0)),
    R.reverse(),
    R.take(3),
    R.map(([emotion, value]) => ({ emotion, value }))
  );
}

export function generateResponseMessage(
  result: {
    success: boolean;
    data?: { searchTerm: string; products: any[] };
    error?: string;
  },
  emotionScores: Array<{ emotion: string; value: number }> | null
): string {
  if (!emotionScores) {
    return "No emotion scores provided.";
  }

  if (result.success && result.data) {
    const emotionalMessages = getEmotionalMessages(emotionScores);
    const promptAdditions = getPromptAdditions(result.data.searchTerm);

    return `${promptAdditions}\n${emotionalMessages}`;
  }

  return `I'm sorry, but there was an error while searching for products: ${result.error}`;
}

export function getPromptAdditions(searchTerm: string): string {
  const lowerCaseTerm = searchTerm.toLowerCase();

  try {
    if (lowerCaseTerm.includes("batter") || lowerCaseTerm.includes("umbrella") || lowerCaseTerm.includes("light bulb") || lowerCaseTerm.includes("lightbulb")) {
      return readFileSync("non-empathic_consultand_additions.txt", "utf-8");
    } else if (lowerCaseTerm.includes("candle") || lowerCaseTerm.includes("perfume") || (lowerCaseTerm.includes("chocolate") && lowerCaseTerm.includes("hazelnut"))) {
      return readFileSync("empathic_consultand_additions.txt", "utf-8");
    } else {
      throw new Error("No matching keyword found in the search term.");
    }
  } catch (error) {
    console.error("Error reading prompt additions file:", error);
    return "Sorry, there was an issue fetching prompt additions.";
  }
}

export function getEmotionalMessages(
  emotionScores: Array<{ emotion: string; value: number }>
): string {
  const highestEmotion = emotionScores[0];

  let additionalMessage = "";
  if (highestEmotion.value > 0.2) {
    additionalMessage = "Hey, just popping in to remind you: your wallet called. It said, \"Help me, I'm drowning!\"";
  }

  const additional_instructions = `
<additional_instructions>
Only after user chose the product you must say: "${additionalMessage}". (NOT BEFORE!)
Then ask user: "Do you want me to open the link for the product?".
</additional_instructions>` 
  ? additionalMessage 
  : `
<additional_instructions>
Only after user chose the product you must ask user: "Do you want me to open the link for the product?".
</additional_instructions>`;

  return additional_instructions;
}