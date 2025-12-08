import React from 'react';

type ProfileCardProps = {
  name: string;
  role?: string;
  slogan?: string;
};

export default function ProfileCard({ name, role, slogan }: ProfileCardProps) {
  return (
    <div
      style={{
        borderRadius: '12px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        padding: '1rem 1.25rem',
        margin: '0.75rem 0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        background: 'var(--ifm-background-surface-color)',
      }}
    >
      <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{name}</div>
      {role && (
        <div
          style={{
            fontSize: '0.9rem',
            color: 'var(--ifm-color-emphasis-600)',
            marginTop: '0.25rem',
          }}
        >
          {role}
        </div>
      )}
      {slogan && (
        <div
          style={{
            fontSize: '0.9rem',
            marginTop: '0.5rem',
            color: 'var(--ifm-color-emphasis-700)',
            fontStyle: 'italic',
          }}
        >
          “{slogan}”
        </div>
      )}
    </div>
  );
}
