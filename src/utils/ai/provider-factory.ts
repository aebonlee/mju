import { streamOpenAI } from './openai';
import { streamClaude } from './claude';
import { streamGemini } from './gemini';
import { streamGenspark } from './genspark';

interface ChatMessage { role: string; content: string; }
type StreamFunction = (apiKey: string, model: string, messages: ChatMessage[], options?: Record<string, unknown>) => AsyncGenerator<string>;

const streamFunctions: Record<string, StreamFunction> = {
  openai: streamOpenAI,
  claude: streamClaude,
  gemini: streamGemini,
  genspark: streamGenspark,
};

export function getStreamFunction(providerId: string) {
  const fn = streamFunctions[providerId];
  if (!fn) throw new Error(`Unknown provider: ${providerId}`);
  return fn;
}
