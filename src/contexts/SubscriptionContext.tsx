import { createContext, useContext, type ReactElement, type ReactNode } from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { useSharedKeys } from '../hooks/useSharedKeys';
import type { SharedKey } from '../types';

interface SubscriptionContextValue {
  tokenBalance: number;
  hasTokens: boolean;
  isSubscribed: boolean; // alias for hasTokens (backward compat)
  loading: boolean;
  sharedKeys: SharedKey[];
  getSharedKey: (provider: string) => string | null;
  hasSharedKey: (provider: string) => boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }): ReactElement {
  const { tokenBalance, hasTokens, loading, refresh } = useSubscription();
  const { sharedKeys, getSharedKey, hasSharedKey } = useSharedKeys(hasTokens);

  return (
    <SubscriptionContext.Provider value={{
      tokenBalance,
      hasTokens,
      isSubscribed: hasTokens,
      loading,
      sharedKeys,
      getSharedKey,
      hasSharedKey,
      refreshSubscription: refresh,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscriptionContext must be used within SubscriptionProvider');
  return ctx;
}
