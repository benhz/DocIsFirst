import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type SpaceContent = {
  dailyQuote?: string;
  mood?: string;
  weeklyBugs?: string[];
  inspiration?: string;
  frustration?: string;
  customSections?: {
    title: string;
    content: string;
  }[];
};

type Member = {
  id: string;
  name: string;
  emoji?: string;
  content: SpaceContent;
};

type MySpaceProps = {
  members: Member[];
};

const SpaceSection: React.FC<{ title: string; emoji?: string; children: React.ReactNode }> = ({
  title,
  emoji,
  children,
}) => (
  <div
    style={{
      marginBottom: '1.5rem',
      padding: '1rem',
      borderRadius: '12px',
      background: 'var(--ifm-background-surface-color)',
      border: '1px solid var(--ifm-color-emphasis-200)',
    }}
  >
    <h4 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem' }}>
      {emoji && <span style={{ marginRight: '0.5rem' }}>{emoji}</span>}
      {title}
    </h4>
    <div style={{ color: 'var(--ifm-color-emphasis-800)' }}>{children}</div>
  </div>
);

export default function MySpace({ members }: MySpaceProps) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        padding: '1.25rem',
        margin: '1.5rem 0',
        background:
          'linear-gradient(135deg, rgba(138, 43, 226, 0.08), rgba(255, 105, 180, 0.04))',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>
        🧘 My Space · 我们的小宇宙
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1rem' }}>
        这里是每个人的私人空间，记录日常、吐槽、灵感与骚话 ✨
      </p>

      <Tabs>
        {members.map((member) => (
          <TabItem
            key={member.id}
            value={member.id}
            label={`${member.emoji || '👤'} ${member.name}`}
          >
            <div style={{ marginTop: '1rem' }}>
              {member.content.dailyQuote && (
                <SpaceSection title="今日名言" emoji="💬">
                  <blockquote
                    style={{
                      margin: 0,
                      padding: '0.5rem 1rem',
                      borderLeft: '3px solid var(--ifm-color-primary)',
                      fontStyle: 'italic',
                    }}
                  >
                    {member.content.dailyQuote}
                  </blockquote>
                </SpaceSection>
              )}

              {member.content.mood && (
                <SpaceSection title="心情指数" emoji="🌡️">
                  <div style={{ fontSize: '1.5rem' }}>{member.content.mood}</div>
                </SpaceSection>
              )}

              {member.content.weeklyBugs && member.content.weeklyBugs.length > 0 && (
                <SpaceSection title="本周踩坑记录" emoji="🕳️">
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {member.content.weeklyBugs.map((bug, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>
                        {bug}
                      </li>
                    ))}
                  </ul>
                </SpaceSection>
              )}

              {member.content.inspiration && (
                <SpaceSection title="灵感瞬间" emoji="💡">
                  <p style={{ margin: 0 }}>{member.content.inspiration}</p>
                </SpaceSection>
              )}

              {member.content.frustration && (
                <SpaceSection title="想打谁但没打成" emoji="🤣">
                  <p style={{ margin: 0 }}>{member.content.frustration}</p>
                </SpaceSection>
              )}

              {member.content.customSections?.map((section, idx) => (
                <SpaceSection key={idx} title={section.title}>
                  <p style={{ margin: 0 }}>{section.content}</p>
                </SpaceSection>
              ))}
            </div>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
