export function exportJSON(content: string, filename = 'output', metadata: Record<string, unknown> = {}) {
  const data = {
    generated_by: 'Teaching AI',
    generated_at: new Date().toISOString(),
    ...metadata,
    content,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
