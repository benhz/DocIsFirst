import React from 'react';

type MySpaceProps = {
  name: string;
  avatar?: string;
  emoji?: string;
  content: string;
};

export default function MySpace({ name, avatar, emoji, content }: MySpaceProps) {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}
      >
        {emoji && <span style={{ fontSize: '1.5rem' }}>{emoji}</span>}
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{name}的空间</h3>
        {avatar && (
          <img
            src={avatar}
            alt={name}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--ifm-color-primary-lighter)',
            }}
          />
        )}
      </div>
      <blockquote
        style={{
          borderLeft: '3px solid var(--ifm-color-primary)',
          paddingLeft: '1rem',
          marginLeft: 0,
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-700)',
        }}
      >
        "{content}"
      </blockquote>
    </div>
  );
}
