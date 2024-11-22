import "server-only";
import { fetchAccessToken } from "@humeai/voice";

/**
 * Fetches an access token from Hume AI using API and Secret keys from environment variables.
 *
 * @returns The access token as a string or null in case of failure.
 */
export const getHumeAccessToken = async () => {
  const apiKey = process.env.HUME_API_KEY;
  const secretKey = process.env.HUME_SECRET_KEY;

  if (!apiKey || !secretKey) {
    console.error(
      "HUME_API_KEY or HUME_SECRET_KEY is missing from environment variables."
    );
    return null;
  }

  try {
    const accessToken = await fetchAccessToken({
      apiKey: apiKey,
      clientSecret: secretKey,
    });

    if (!accessToken) {
      console.error(
        "Failed to fetch access token: Received an empty response."
      );
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error(
      "Error fetching Hume access token:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
};
