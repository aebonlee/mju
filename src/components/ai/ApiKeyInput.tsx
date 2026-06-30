interface ApiKeyInputProps { value: string; onChange: (val: string) => void; placeholder?: string; }

import { useState } from 'react';

export default function ApiKeyInput({ value, onChange, placeholder = 'sk-...' }: ApiKeyInputProps) {
  const [visible, setVisible] = useState(false);

  // maskedValue available if needed for display:
  // const maskedValue = value && !visible ? value.slice(0, 8) + '•'.repeat(Math.max(0, value.length - 12)) + value.slice(-4) : value;

  return (
    <div className="api-key-input-group">
      <input
        type={visible ? 'text' : 'password'}
        className="api-key-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button
        className="api-key-toggle"
        onClick={() => setVisible(!visible)}
        type="button"
        title={visible ? 'Hide' : 'Show'}
      >
        <i className={`fa-solid ${visible ? 'fa-eye-slash' : 'fa-eye'}`} />
      </button>
    </div>
  );
}
