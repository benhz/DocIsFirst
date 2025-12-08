import React from 'react';

type TipProps = {
  type?: 'info' | 'fun' | 'star';
  message: string;
};

const typeConfig: Record<
  NonNullable<TipProps['type']>,
  { bg: string; border: string; label: string }
> = {
  info: {
    bg: 'rgba(0, 123, 255, 0.06)',
    border: 'rgba(0, 123, 255, 0.4)',
    label: '提示',
  },
  fun: {
    bg: 'rgba(255, 193, 7, 0.08)',
    border: 'rgba(255, 193, 7, 0.5)',
    label: '骚话预警',
  },
  star: {
    bg: 'rgba(111, 66, 193, 0.08)',
    border: 'rgba(111, 66, 193, 0.5)',
    label: '重点',
  },
};

export default function Tip({ type = 'info', message }: TipProps) {
  const cfg = typeConfig[type];

  return (
    <div
      style={{
        borderRadius: '10px',
        padding: '0.75rem 0.9rem',
        margin: '0.75rem 0',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        fontSize: '0.9rem',
      }}
    >
      <strong style={{ marginRight: '0.35rem' }}>{cfg.label}：</strong>
      <span>{message}</span>
    </div>
  );
}
