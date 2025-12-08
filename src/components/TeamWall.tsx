import React from 'react';

type Member = {
  name: string;
  avatar?: string;
  role?: string | string[];  // 支持字符串或标签数组
  quote?: string;
};

type TeamWallProps = {
  members: Member[];
};

export default function TeamWall({ members }: TeamWallProps) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        padding: '1.25rem',
        margin: '1.5rem 0',
        background:
          'linear-gradient(135deg, rgba(0, 200, 255, 0.08), rgba(255, 0, 200, 0.04))',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>团队墙 · 我们这群人</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {members.map((m) => (
          <div
            key={m.name}
            style={{
              borderRadius: '12px',
              background: 'var(--ifm-background-surface-color)',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.6rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <div>
              {m.avatar ? (
                <img
                  src={m.avatar}
                  alt={m.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--ifm-color-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                  }}
                >
                  {m.name.charAt(0)}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{m.name}</div>
              {m.role && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.35rem',
                    marginTop: '0.35rem',
                  }}
                >
                  {(Array.isArray(m.role) ? m.role : [m.role]).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        background: 'var(--ifm-color-primary)',
                        color: '#fff',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {m.quote && (
                <div
                  style={{
                    fontSize: '0.8rem',
                    marginTop: '0.35rem',
                    color: 'var(--ifm-color-emphasis-700)',
                    fontStyle: 'italic',
                  }}
                >
                  "{m.quote}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
