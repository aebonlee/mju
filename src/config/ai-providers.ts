export interface AIModel {
  id: string;
  name: string;
  inputPrice: number;
  outputPrice: number;
}

export interface AIProvider {
  id: string;
  name: string;
  color: string;
  models: AIModel[];
  defaultModel: string;
  endpoint: string;
  keyPrefix: string;
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    color: '#10A37F',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', inputPrice: 2.5, outputPrice: 10 },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', inputPrice: 0.15, outputPrice: 0.6 },
    ],
    defaultModel: 'gpt-4o-mini',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    keyPrefix: 'sk-',
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    color: '#D97706',
    models: [
      { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', inputPrice: 3, outputPrice: 15 },
      { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', inputPrice: 0.8, outputPrice: 4 },
    ],
    defaultModel: 'claude-haiku-4-5-20251001',
    endpoint: 'https://api.anthropic.com/v1/messages',
    keyPrefix: 'sk-ant-',
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    color: '#4285F4',
    models: [
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', inputPrice: 0.075, outputPrice: 0.3 },
      { id: 'gemini-2.5-pro-preview-06-05', name: 'Gemini 2.5 Pro', inputPrice: 1.25, outputPrice: 10 },
    ],
    defaultModel: 'gemini-2.0-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    keyPrefix: 'AI',
  },
  genspark: {
    id: 'genspark',
    name: 'Genspark',
    color: '#8B5CF6',
    models: [
      { id: 'genspark-default', name: 'Genspark', inputPrice: 0, outputPrice: 0 },
    ],
    defaultModel: 'genspark-default',
    endpoint: 'https://api.genspark.ai/v1/chat/completions',
    keyPrefix: '',
  },
};

export const PROVIDER_LIST: AIProvider[] = Object.values(AI_PROVIDERS);
export const DEFAULT_PROVIDER = 'openai';
