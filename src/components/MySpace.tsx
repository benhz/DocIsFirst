import React, { useState } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type WeekContent = {
  weekNumber: number;
  weekLabel: string;
  dateRange?: string;
  summary?: string;
  mood?: string;
  weeklyBugs?: string[];
  inspiration?: string;
  frustration?: string;
  achievements?: string[];
  learnings?: string[];
  customSections?: {
    title: string;
    content: string;
    emoji?: string;
  }[];
};

type Member = {
  id: string;
  name: string;
  emoji?: string;
  weeks: WeekContent[];
};

type MySpaceProps = {
  members: Member[];
};

const ContentCard: React.FC<{
  title: string;
  emoji?: string;
  children: React.ReactNode;
  gradient?: string;
}> = ({ title, emoji, children, gradient }) => (
  <div
    style={{
      marginBottom: '1rem',
      padding: '1.25rem',
      borderRadius: '12px',
      background: gradient || 'var(--ifm-background-surface-color)',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }}
  >
    <h4
      style={{
        marginTop: 0,
        marginBottom: '0.75rem',
        fontSize: '1rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {emoji && <span style={{ fontSize: '1.2rem' }}>{emoji}</span>}
      {title}
    </h4>
    <div style={{ color: 'var(--ifm-color-emphasis-800)' }}>{children}</div>
  </div>
);

const WeekSelector: React.FC<{
  weeks: WeekContent[];
  currentWeek: number;
  onChange: (weekNumber: number) => void;
}> = ({ weeks, currentWeek, onChange }) => (
  <div
    style={{
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}
  >
    {weeks.map((week) => (
      <button
        key={week.weekNumber}
        onClick={() => onChange(week.weekNumber)}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          border: currentWeek === week.weekNumber
            ? '2px solid var(--ifm-color-primary)'
            : '1px solid var(--ifm-color-emphasis-300)',
          background: currentWeek === week.weekNumber
            ? 'var(--ifm-color-primary)'
            : 'var(--ifm-background-surface-color)',
          color: currentWeek === week.weekNumber
            ? '#fff'
            : 'var(--ifm-color-emphasis-800)',
          cursor: 'pointer',
          fontWeight: currentWeek === week.weekNumber ? 600 : 400,
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (currentWeek !== week.weekNumber) {
            e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentWeek !== week.weekNumber) {
            e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {week.weekLabel}
        {week.dateRange && (
          <div style={{ fontSize: '0.7rem', marginTop: '0.2rem', opacity: 0.8 }}>
            {week.dateRange}
          </div>
        )}
      </button>
    ))}
  </div>
);

const WeekSummaryCard: React.FC<{ week: WeekContent }> = ({ week }) => (
  <div
    style={{
      marginBottom: '1.5rem',
      padding: '1.5rem',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.05))',
      border: '2px solid rgba(99, 102, 241, 0.2)',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
      }}
    >
      <div>
        <h3 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.3rem' }}>
          📅 {week.weekLabel}
        </h3>
        {week.dateRange && (
          <div style={{ fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-700)' }}>
            {week.dateRange}
          </div>
        )}
      </div>
      {week.mood && (
        <div style={{ fontSize: '2rem', lineHeight: 1 }}>
          {week.mood}
        </div>
      )}
    </div>
    {week.summary && (
      <p
        style={{
          margin: 0,
          fontSize: '0.95rem',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-800)',
          lineHeight: 1.6,
        }}
      >
        "{week.summary}"
      </p>
    )}
  </div>
);

export default function MySpace({ members }: MySpaceProps) {
  const [selectedWeeks, setSelectedWeeks] = useState<{ [key: string]: number }>(
    members.reduce((acc, member) => {
      acc[member.id] = member.weeks[0]?.weekNumber || 1;
      return acc;
    }, {})
  );

  const handleWeekChange = (memberId: string, weekNumber: number) => {
    setSelectedWeeks((prev) => ({ ...prev, [memberId]: weekNumber }));
  };

  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        padding: '1.5rem',
        margin: '1.5rem 0',
        background:
          'linear-gradient(135deg, rgba(138, 43, 226, 0.06), rgba(255, 105, 180, 0.03))',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.5rem' }}>
          🧘 My Space · 团队周报与日常
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)', margin: 0 }}>
          记录每周的成长、踩坑、灵感与吐槽 ✨
        </p>
      </div>

      <Tabs>
        {members.map((member) => {
          const currentWeekNumber = selectedWeeks[member.id] || member.weeks[0]?.weekNumber || 1;
          const currentWeek = member.weeks.find((w) => w.weekNumber === currentWeekNumber);

          return (
            <TabItem
              key={member.id}
              value={member.id}
              label={`${member.emoji || '👤'} ${member.name}`}
            >
              <div style={{ marginTop: '1.5rem' }}>
                {member.weeks.length > 1 && (
                  <WeekSelector
                    weeks={member.weeks}
                    currentWeek={currentWeekNumber}
                    onChange={(weekNumber) => handleWeekChange(member.id, weekNumber)}
                  />
                )}

                {currentWeek ? (
                  <>
                    <WeekSummaryCard week={currentWeek} />

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem',
                      }}
                    >
                      {currentWeek.achievements && currentWeek.achievements.length > 0 && (
                        <ContentCard
                          title="本周成就"
                          emoji="🏆"
                          gradient="linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))"
                        >
                          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {currentWeek.achievements.map((achievement, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </ContentCard>
                      )}

                      {currentWeek.weeklyBugs && currentWeek.weeklyBugs.length > 0 && (
                        <ContentCard
                          title="踩坑记录"
                          emoji="🕳️"
                          gradient="linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))"
                        >
                          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {currentWeek.weeklyBugs.map((bug, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                {bug}
                              </li>
                            ))}
                          </ul>
                        </ContentCard>
                      )}

                      {currentWeek.learnings && currentWeek.learnings.length > 0 && (
                        <ContentCard
                          title="本周学习"
                          emoji="📚"
                          gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))"
                        >
                          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                            {currentWeek.learnings.map((learning, idx) => (
                              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                {learning}
                              </li>
                            ))}
                          </ul>
                        </ContentCard>
                      )}

                      {currentWeek.inspiration && (
                        <ContentCard
                          title="灵感瞬间"
                          emoji="💡"
                          gradient="linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.05))"
                        >
                          <p style={{ margin: 0, lineHeight: 1.6 }}>
                            {currentWeek.inspiration}
                          </p>
                        </ContentCard>
                      )}

                      {currentWeek.frustration && (
                        <ContentCard
                          title="想打谁但没打成"
                          emoji="🤣"
                          gradient="linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05))"
                        >
                          <p style={{ margin: 0, lineHeight: 1.6 }}>
                            {currentWeek.frustration}
                          </p>
                        </ContentCard>
                      )}

                      {currentWeek.customSections?.map((section, idx) => (
                        <ContentCard
                          key={idx}
                          title={section.title}
                          emoji={section.emoji}
                          gradient="linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))"
                        >
                          <p style={{ margin: 0, lineHeight: 1.6 }}>
                            {section.content}
                          </p>
                        </ContentCard>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '3rem 1rem',
                      color: 'var(--ifm-color-emphasis-600)',
                    }}
                  >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                    <p>暂无本周记录，快来添加吧！</p>
                  </div>
                )}
              </div>
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
}
