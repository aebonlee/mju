export async function withRetry(fn: () => Promise<unknown>, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      if (attempt === maxRetries) throw error;

      // Don't retry on auth errors
      if ((error as Error).message?.includes('401') || (error as Error).message?.includes('403')) throw error;

      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 500;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
