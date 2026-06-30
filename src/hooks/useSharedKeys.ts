import { useState, useEffect, useCallback } from 'react';
import { getSharedKeys } from '../utils/subscription';
import type { SharedKey } from '../types';

export function useSharedKeys(isSubscribed: boolean) {
  const [sharedKeys, setSharedKeys] = useState<SharedKey[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isSubscribed) {
      setSharedKeys([]);
      return;
    }
    setLoading(true);
    try {
      const keys = await getSharedKeys();
      setSharedKeys(keys);
    } catch {
      setSharedKeys([]);
    }
    setLoading(false);
  }, [isSubscribed]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getSharedKey = useCallback((provider: string): string | null => {
    const key = sharedKeys.find(k => k.provider === provider && k.is_active);
    return key?.api_key || null;
  }, [sharedKeys]);

  const hasSharedKey = useCallback((provider: string): boolean => {
    return sharedKeys.some(k => k.provider === provider && k.is_active);
  }, [sharedKeys]);

  return { sharedKeys, getSharedKey, hasSharedKey, loading, refresh };
}
