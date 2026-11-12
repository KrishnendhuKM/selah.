
const API_URL = "https://api.midvash.com/v1";

const BOOK_ALIASES = {
  "Psalm": "psalms",
  "Psalms": "psalms"
};

export async function getBibleVerse(reference) {
  const normalizedReference = reference.replace(
    /^(Psalm|Psalms)\b/i,
    "Psalms"
  );

  const params = new URLSearchParams({
    refs: normalizedReference,
    version: "web"
  });

  let lastError;

  // Retry temporary network failures once.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(
        `${API_URL}/passages?${params.toString()}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.message || "Bible API unavailable"
        );
      }

      const verse = result.data?.[0];

      if (!verse || verse.error || !verse.text) {
        throw new Error(
          verse?.error?.message || "Verse not found"
        );
      }

      return {
        text: verse.text,
        reference: verse.reference || reference,
        version: verse.version || "web",
        copyright: result.meta?.copyright || ""
      };

    } catch (error) {
      lastError = error;

      if (attempt === 0) {
        await new Promise(resolve => setTimeout(resolve, 700));
      }
    }
  }

  throw lastError;
}
