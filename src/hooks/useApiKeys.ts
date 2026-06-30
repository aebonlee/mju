import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import { useSubscriptionContext } from '../contexts/SubscriptionContext';

const STORAGE_KEY = 'teaching_api_keys';

export type KeySource = 'personal' | 'shared' | 'none';

export function useApiKeys() {
  const { user, profile } = useAuth();
  const { getSharedKey, hasSharedKey, isSubscribed } = useSubscriptionContext();
  const [keys, setKeys] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) as Record<string, string> : {};
    } catch {
      return {} as Record<string, string>;
    }
  });

  // Sync with profile if available
  useEffect(() => {
    if (profile?.api_keys) {
      setKeys(prev => ({ ...prev, ...profile.api_keys }));
    }
  }, [profile]);

  const setApiKey = useCallback(async (provider: string, key: string) => {
    const updated = { ...keys, [provider]: key };
    setKeys(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also save to Supabase if logged in
    if (user) {
      try {
        await supabase
          .from('user_profiles')
          .upsert({ id: user.id, api_keys: updated }, { onConflict: 'id' });
      } catch {
        // Silently fail - local storage is the fallback
      }
    }
  }, [keys, user]);

  const getApiKey = useCallback((provider: string) => {
    return keys[provider] || '';
  }, [keys]);

  const hasApiKey = useCallback((provider: string) => {
    return !!keys[provider]?.trim();
  }, [keys]);

  /** Returns the effective API key with priority: personal > shared > none */
  const getEffectiveApiKey = useCallback((provider: string): { key: string; source: KeySource } => {
    // Priority 1: Personal API key
    const personalKey = keys[provider]?.trim();
    if (personalKey) {
      return { key: personalKey, source: 'personal' };
    }

    // Priority 2: Shared key (requires active subscription)
    if (isSubscribed && hasSharedKey(provider)) {
      const shared = getSharedKey(provider);
      if (shared) {
        return { key: shared, source: 'shared' };
      }
    }

    // No key available
    return { key: '', source: 'none' };
  }, [keys, isSubscribed, hasSharedKey, getSharedKey]);

  /** Check if any key (personal or shared) is available for provider */
  const hasAnyKey = useCallback((provider: string): boolean => {
    if (keys[provider]?.trim()) return true;
    if (isSubscribed && hasSharedKey(provider)) return true;
    return false;
  }, [keys, isSubscribed, hasSharedKey]);

  return { keys, setApiKey, getApiKey, hasApiKey, getEffectiveApiKey, hasAnyKey, isSubscribed };
}
