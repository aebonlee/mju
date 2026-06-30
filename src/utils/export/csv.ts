export function exportCSV(content: string, filename = 'output') {
  // Try to extract tables from markdown
  const tables = extractTables(content);

  let csvContent;
  if (tables.length > 0) {
    csvContent = tables.map(table =>
      table.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
    ).join('\n\n');
  } else {
    // Fallback: one column with content lines
    csvContent = content.split('\n').map(line => `"${line.replace(/"/g, '""')}"`).join('\n');
  }

  // UTF-8 BOM for Korean support
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function extractTables(markdown: string): string[][][] {
  const tables = [];
  const lines = markdown.split('\n');
  let currentTable = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      // Skip separator rows
      if (/^\|[\s-:|]+\|$/.test(trimmed)) continue;

      const cells = trimmed.split('|').filter(Boolean).map(c => c.trim());
      currentTable.push(cells);
      inTable = true;
    } else {
      if (inTable && currentTable.length > 0) {
        tables.push(currentTable);
        currentTable = [];
      }
      inTable = false;
    }
  }

  if (currentTable.length > 0) tables.push(currentTable);
  return tables;
}
