import React from 'react';

type HeroProps = {
  title?: string;
  subtitle?: string;
  height?: number;
  gradient?: string;
};

export default function Hero({
  title = '欢迎来到开发者中心',
  subtitle = '这里是我们 5 个人的小社会，但写出的代码能镇压一整个星系',
  height = 200,
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}: HeroProps) {
  return (
    <div
      style={{
        position: 'relative',
        margin: '1rem 0 2rem',
        borderRadius: '16px',
        overflow: 'hidden',
        background: gradient,
        height: `${height}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      }}
    >
      <h2
        style={{
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold',
          margin: '0 0 0.5rem 0',
          textAlign: 'center',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: 'rgba(255, 255, 255, 0.95)',
          fontSize: '1.1rem',
          margin: 0,
          textAlign: 'center',
          maxWidth: '800px',
          textShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
