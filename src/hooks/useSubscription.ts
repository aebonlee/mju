import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getTokenBalance } from '../utils/subscription';

export function useSubscription() {
  const { user } = useAuth();
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setTokenBalance(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const balance = await getTokenBalance(user.id);
      setTokenBalance(balance);
    } catch {
      setTokenBalance(0);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const hasTokens = tokenBalance > 0;

  return { tokenBalance, hasTokens, loading, refresh };
}
