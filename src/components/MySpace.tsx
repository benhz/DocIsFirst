import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

type Skill = {
  name: string;
  level: number; // 0-100
  color?: string;
};

type Achievement = {
  title: string;
  description?: string;
  icon?: string;
  date?: string;
};

type Hobby = {
  name: string;
  icon?: string;
  description?: string;
};

type Quote = {
  text: string;
  author?: string;
};

type Moment = {
  content: string;
  emoji?: string;
  date?: string;
};

type MemberProfile = {
  id: string;
  name: string;
  avatar?: string;
  emoji?: string;

  // 顶部个人信息
  bio?: string;                    // 个性签名
  tags?: string[];                 // 个人标签
  currentStatus?: string;          // 当前状态
  themeColor?: string;            // 主题色

  // 主体内容
  skills?: Skill[];               // 技能树
  achievements?: Achievement[];    // 高光时刻
  hobbies?: Hobby[];              // 兴趣爱好
  favoriteQuotes?: Quote[];       // 金句墙
  moments?: Moment[];             // 随笔/动态

  // 自定义卡片
  customCards?: {
    title: string;
    emoji?: string;
    content: string;
    color?: string;
  }[];
};

type MySpaceProps = {
  members: MemberProfile[];
};

// 技能条组件
const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</span>
      <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
        {skill.level}%
      </span>
    </div>
    <div
      style={{
        width: '100%',
        height: '8px',
        background: 'var(--ifm-color-emphasis-200)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${skill.level}%`,
          height: '100%',
          background: skill.color || 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '4px',
          transition: 'width 1s ease-out',
        }}
      />
    </div>
  </div>
);

// 卡片组件
const ProfileCard: React.FC<{
  title: string;
  emoji?: string;
  children: React.ReactNode;
  gradient?: string;
}> = ({ title, emoji, children, gradient }) => (
  <div
    style={{
      marginBottom: '1.5rem',
      padding: '1.5rem',
      borderRadius: '16px',
      background: gradient || 'var(--ifm-background-surface-color)',
      border: '1px solid var(--ifm-color-emphasis-200)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
    }}
  >
    <h3
      style={{
        marginTop: 0,
        marginBottom: '1.25rem',
        fontSize: '1.2rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {emoji && <span style={{ fontSize: '1.4rem' }}>{emoji}</span>}
      {title}
    </h3>
    {children}
  </div>
);

// 个人头部信息
const ProfileHeader: React.FC<{ member: MemberProfile }> = ({ member }) => (
  <div
    style={{
      marginBottom: '2rem',
      padding: '2rem',
      borderRadius: '20px',
      background: member.themeColor
        ? `linear-gradient(135deg, ${member.themeColor}22, ${member.themeColor}08)`
        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.08))',
      border: '2px solid',
      borderColor: member.themeColor
        ? `${member.themeColor}40`
        : 'rgba(99, 102, 241, 0.25)',
      textAlign: 'center',
    }}
  >
    {/* 头像 */}
    {member.avatar && (
      <div style={{ marginBottom: '1rem' }}>
        <img
          src={member.avatar}
          alt={member.name}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid var(--ifm-background-surface-color)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            objectFit: 'cover',
          }}
        />
      </div>
    )}

    {/* 名字 */}
    <h2 style={{ margin: '0.5rem 0', fontSize: '1.8rem' }}>
      {member.emoji} {member.name}
    </h2>

    {/* 个性签名 */}
    {member.bio && (
      <p
        style={{
          fontSize: '1rem',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-700)',
          margin: '0.75rem 0 1.5rem',
        }}
      >
        "{member.bio}"
      </p>
    )}

    {/* 标签云 */}
    {member.tags && member.tags.length > 0 && (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        {member.tags.map((tag, idx) => (
          <span
            key={idx}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              background: 'var(--ifm-background-surface-color)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              fontSize: '0.85rem',
              fontWeight: 500,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    )}

    {/* 当前状态 */}
    {member.currentStatus && (
      <div
        style={{
          display: 'inline-block',
          padding: '0.6rem 1.5rem',
          borderRadius: '12px',
          background: 'var(--ifm-background-surface-color)',
          border: '2px solid var(--ifm-color-emphasis-300)',
          fontSize: '0.95rem',
          fontWeight: 500,
        }}
      >
        📍 {member.currentStatus}
      </div>
    )}
  </div>
);

export default function MySpace({ members }: MySpaceProps) {
  return (
    <div
      style={{
        borderRadius: '20px',
        border: '1px solid var(--ifm-color-emphasis-200)',
        padding: '2rem',
        margin: '2rem 0',
        background:
          'linear-gradient(135deg, rgba(138, 43, 226, 0.04), rgba(255, 105, 180, 0.02))',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '2rem' }}>
          🌟 My Space · 团队风采展示
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--ifm-color-emphasis-700)', margin: 0 }}>
          这里是我们每个人的小宇宙，展示真实的自己 ✨
        </p>
      </div>

      <Tabs>
        {members.map((member) => (
          <TabItem
            key={member.id}
            value={member.id}
            label={`${member.emoji || '👤'} ${member.name}`}
          >
            <div style={{ marginTop: '1.5rem' }}>
              {/* 个人头部信息 */}
              <ProfileHeader member={member} />

              {/* 技能树 */}
              {member.skills && member.skills.length > 0 && (
                <ProfileCard
                  title="技能树"
                  emoji="💪"
                  gradient="linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))"
                >
                  {member.skills.map((skill, idx) => (
                    <SkillBar key={idx} skill={skill} />
                  ))}
                </ProfileCard>
              )}

              {/* 高光时刻 */}
              {member.achievements && member.achievements.length > 0 && (
                <ProfileCard
                  title="高光时刻"
                  emoji="🏆"
                  gradient="linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {member.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: 'var(--ifm-background-surface-color)',
                          border: '1px solid var(--ifm-color-emphasis-200)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.75rem',
                          }}
                        >
                          {achievement.icon && (
                            <span style={{ fontSize: '1.5rem' }}>{achievement.icon}</span>
                          )}
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                              {achievement.title}
                            </div>
                            {achievement.description && (
                              <div
                                style={{
                                  fontSize: '0.9rem',
                                  color: 'var(--ifm-color-emphasis-700)',
                                }}
                              >
                                {achievement.description}
                              </div>
                            )}
                            {achievement.date && (
                              <div
                                style={{
                                  fontSize: '0.8rem',
                                  color: 'var(--ifm-color-emphasis-600)',
                                  marginTop: '0.25rem',
                                }}
                              >
                                {achievement.date}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ProfileCard>
              )}

              {/* 兴趣爱好 */}
              {member.hobbies && member.hobbies.length > 0 && (
                <ProfileCard
                  title="兴趣爱好"
                  emoji="🎨"
                  gradient="linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05))"
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {member.hobbies.map((hobby, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: 'var(--ifm-background-surface-color)',
                          border: '1px solid var(--ifm-color-emphasis-200)',
                          textAlign: 'center',
                        }}
                      >
                        {hobby.icon && (
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {hobby.icon}
                          </div>
                        )}
                        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                          {hobby.name}
                        </div>
                        {hobby.description && (
                          <div
                            style={{
                              fontSize: '0.8rem',
                              color: 'var(--ifm-color-emphasis-600)',
                            }}
                          >
                            {hobby.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ProfileCard>
              )}

              {/* 金句墙 */}
              {member.favoriteQuotes && member.favoriteQuotes.length > 0 && (
                <ProfileCard
                  title="金句墙"
                  emoji="💬"
                  gradient="linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.05))"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {member.favoriteQuotes.map((quote, idx) => (
                      <blockquote
                        key={idx}
                        style={{
                          margin: 0,
                          padding: '1rem 1.5rem',
                          borderLeft: '4px solid var(--ifm-color-primary)',
                          background: 'var(--ifm-background-surface-color)',
                          borderRadius: '8px',
                          fontStyle: 'italic',
                        }}
                      >
                        <p style={{ margin: 0, marginBottom: '0.5rem' }}>{quote.text}</p>
                        {quote.author && (
                          <footer
                            style={{
                              fontSize: '0.85rem',
                              color: 'var(--ifm-color-emphasis-600)',
                              textAlign: 'right',
                            }}
                          >
                            — {quote.author}
                          </footer>
                        )}
                      </blockquote>
                    ))}
                  </div>
                </ProfileCard>
              )}

              {/* 随笔动态 */}
              {member.moments && member.moments.length > 0 && (
                <ProfileCard
                  title="随笔 · 想说的话"
                  emoji="✍️"
                  gradient="linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {member.moments.map((moment, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: 'var(--ifm-background-surface-color)',
                          border: '1px solid var(--ifm-color-emphasis-200)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          {moment.emoji && (
                            <span style={{ fontSize: '1.5rem' }}>{moment.emoji}</span>
                          )}
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, lineHeight: 1.6 }}>{moment.content}</p>
                            {moment.date && (
                              <div
                                style={{
                                  fontSize: '0.8rem',
                                  color: 'var(--ifm-color-emphasis-600)',
                                  marginTop: '0.5rem',
                                }}
                              >
                                {moment.date}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ProfileCard>
              )}

              {/* 自定义卡片 */}
              {member.customCards?.map((card, idx) => (
                <ProfileCard
                  key={idx}
                  title={card.title}
                  emoji={card.emoji}
                  gradient={card.color}
                >
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{card.content}</p>
                </ProfileCard>
              ))}

              {/* 空状态 */}
              {!member.skills &&
                !member.achievements &&
                !member.hobbies &&
                !member.favoriteQuotes &&
                !member.moments &&
                !member.customCards && (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '4rem 2rem',
                      color: 'var(--ifm-color-emphasis-600)',
                    }}
                  >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✨</div>
                    <p style={{ fontSize: '1.1rem' }}>这是我的专属空间，正在装修中...</p>
                  </div>
                )}
            </div>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
