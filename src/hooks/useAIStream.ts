interface UsageInfo { inputTokens: number; outputTokens: number; cost: number; }
interface ChatMessage { role: string; content: string; }
interface GenerateOptions {
  provider: string;
  apiKey: string;
  model: string;
  messages: ChatMessage[];
  toolId?: string;
  keySource?: 'personal' | 'shared';
}

import { useState, useCallback, useRef } from 'react';
import { getStreamFunction } from '../utils/ai/provider-factory';
import { estimateTokens, calculateCost } from '../utils/ai/token-counter';
import { AI_PROVIDERS } from '../config/ai-providers';
import { useUsageLog } from './useUsageLog';

export function useAIStream() {
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageInfo>({ inputTokens: 0, outputTokens: 0, cost: 0 });
  const abortRef = useRef(false);
  const { log } = useUsageLog();

  const generate = useCallback(async ({ provider, apiKey, model, messages, toolId, keySource }: GenerateOptions) => {
    setOutput('');
    setError(null);
    setIsStreaming(true);
    abortRef.current = false;

    const providerConfig = AI_PROVIDERS[provider];
    const modelConfig = providerConfig?.models.find(m => m.id === model) || providerConfig?.models[0];

    try {
      const streamFn = getStreamFunction(provider);
      const stream = streamFn(apiKey, model, messages);

      let fullOutput = '';
      const inputText = messages.map(m => m.content).join(' ');
      const inputTokens = estimateTokens(inputText);

      for await (const chunk of stream) {
        if (abortRef.current) break;
        fullOutput += chunk;
        setOutput(fullOutput);
      }

      const outputTokens = estimateTokens(fullOutput);
      const cost = calculateCost(inputTokens, outputTokens, modelConfig);
      setUsage({ inputTokens, outputTokens, cost });

      // Log usage
      if (keySource) {
        log({
          provider,
          model,
          tool_id: toolId,
          input_tokens: inputTokens,
          output_tokens: outputTokens,
          estimated_cost: cost,
          key_source: keySource,
        });
      }

      return fullOutput;
    } catch (err: unknown) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsStreaming(false);
    }
  }, [log]);

  const stop = useCallback(() => {
    abortRef.current = true;
    setIsStreaming(false);
  }, []);

  const reset = useCallback(() => {
    setOutput('');
    setError(null);
    setUsage({ inputTokens: 0, outputTokens: 0, cost: 0 });
  }, []);

  return { output, isStreaming, error, usage, generate, stop, reset };
}
