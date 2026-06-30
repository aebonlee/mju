import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { logUsage, getUsageLogs, getMonthlyUsage } from '../utils/subscription';
import type { UsageLog } from '../types';

export function useUsageLog() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [monthlyUsage, setMonthlyUsage] = useState({ tokens: 0, requests: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [logsData, monthly] = await Promise.all([
        getUsageLogs(user.id, 50),
        getMonthlyUsage(user.id),
      ]);
      setLogs(logsData);
      setMonthlyUsage(monthly);
    } catch {
      // silent
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const log = useCallback(async (entry: {
    provider: string;
    model: string;
    tool_id?: string;
    input_tokens: number;
    output_tokens: number;
    estimated_cost: number;
    key_source: 'personal' | 'shared';
  }) => {
    if (!user) return;
    await logUsage({
      user_id: user.id,
      provider: entry.provider,
      model: entry.model,
      tool_id: entry.tool_id || null,
      input_tokens: entry.input_tokens,
      output_tokens: entry.output_tokens,
      estimated_cost: entry.estimated_cost,
      key_source: entry.key_source,
    });
  }, [user]);

  return { logs, monthlyUsage, loading, log, refresh };
}
