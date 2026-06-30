// Simple token estimator (approx 4 chars per token for English, ~2 for Korean)
export function estimateTokens(text: string) {
  if (!text) return 0;
  const koreanChars = (text.match(/[\u3131-\uD79D]/g) || []).length;
  const otherChars = text.length - koreanChars;
  return Math.ceil(koreanChars / 2 + otherChars / 4);
}

export function calculateCost(inputTokens: number, outputTokens: number, model: { inputPrice?: number; outputPrice?: number } | null) {
  if (!model) return 0;
  const inputCost = (inputTokens / 1_000_000) * (model.inputPrice || 0);
  const outputCost = (outputTokens / 1_000_000) * (model.outputPrice || 0);
  return inputCost + outputCost;
}

export function formatCost(cost: number) {
  if (cost < 0.001) return '< $0.001';
  return `$${cost.toFixed(4)}`;
}
