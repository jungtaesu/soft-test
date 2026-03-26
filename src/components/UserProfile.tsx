import React from 'react';
import type { User } from '../types/post';

type UserProfileProps = {
  user: User | null;
};

const UserProfile = React.memo(({ user }: UserProfileProps) => {
  if (!user) {
    return <div>사용자 정보를 불러오는 중입니다.</div>;
  }

  return (
    <section
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        padding: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '16px',
      }}
    >
      <img
        src={user.profileImage}
        alt={`${user.name} 프로필`}
        width={64}
        height={64}
        style={{ borderRadius: '50%' }}
      />
      <div>
        <h2 style={{ margin: 0 }}>{user.name}</h2>
        <p style={{ margin: '4px 0' }}>{user.email}</p>
        <p style={{ margin: 0, color: '#666' }}>{user.bio}</p>
      </div>
    </section>
  );
  });

export default UserProfile;