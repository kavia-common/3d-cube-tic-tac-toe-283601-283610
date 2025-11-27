import React from 'react';

// PUBLIC_INTERFACE
export default function ToggleSwitch({ checked, onChange, label }) {
  /** Accessible toggle switch for theme */
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        onClick={() => onChange(!checked)}
        style={{
          width: 44, height: 26, borderRadius: 999,
          background: checked ? 'var(--color-primary)' : 'rgba(0,0,0,0.15)',
          position: 'relative', transition: 'background var(--transition-fast)',
          display: 'inline-block',
        }}
        aria-label="Toggle theme"
      >
        <span style={{
          position: 'absolute',
          top: 3, left: checked ? 22 : 3,
          width: 20, height: 20, borderRadius: 999, background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--transition-fast)',
        }} />
      </span>
    </label>
  );
}
