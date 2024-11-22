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
    if (lowerCaseTerm.includes("batter")) {
      return readFileSync("non-empathic_consultand_additions.txt", "utf-8");
    } else if (lowerCaseTerm.includes("candle")) {
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
  const positiveEmotions = new Set([
    "Admiration",
    "Adoration",
    "Aesthetic Appreciation",
    "Amusement",
    "Calmness",
    "Contentment",
    "Determination",
    "Ecstasy",
    "Entrancement",
    "Excitement",
    "Interest",
    "Joy",
    "Love",
    "Nostalgia",
    "Pride",
    "Realization",
    "Relief",
    "Satisfaction",
    "Surprise (positive)",
    "Triumph",
  ]);

  const highestEmotion = emotionScores[0];
  const emotionType = positiveEmotions.has(highestEmotion.emotion)
    ? "positive"
    : "negative";

  const additionalMessage = getAdditionalMessageBeforeConfirmation(
    highestEmotion.value,
    emotionType === "positive"
  );
  const primaryMessage = `The highest emotion is ${highestEmotion.emotion}`;

  return `
<additional_instructions>
YOU MUST SAY:
- before confirmation: ${additionalMessage}
- after confirmation: ${primaryMessage}
</additional_instructions>`;
}

// Helper function to select additional message
function getAdditionalMessageBeforeConfirmation(
  value: number,
  isPositive: boolean
): string {
  const messages = isPositive
    ? [
        { threshold: 0.3, message: "Retail therapy is tempting, but have you tried yelling into a pillow? Cheaper and oddly satisfying!", },
        { threshold: 0.2, message: "Spending spree alert! Maybe take a walk before checking out.", },
        { threshold: 0.1, message: "Hey there, shopaholic! Your cart's looking lively today.", },
      ]
    : [
        { threshold: 0.3, message: "Are you buying this because you're mad at someone? Breathe first.", },
        { threshold: 0.2, message: "Shopping out of stress? Consider a moment of mindfulness.", },
        { threshold: 0.1, message: "Feeling low? A quick workout might boost your mood instead!", },
      ];

  return messages.find(({ threshold }) => value > threshold)?.message || "";
}
