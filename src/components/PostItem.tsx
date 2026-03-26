import React from 'react';
import type { Post, User } from '../types/post';

type PostItemProps = {
  post: Post;
  handleClick: (postId: number) => void;
  user: User | null;
  userId: number;
  categoryId?: number | null;
};

// const PostItem = ({ 
const PostItem = React.memo(({ 
  post,
  handleClick,
  user,
  userId,
  categoryId,
}: PostItemProps) => {
  return (
    <article
      onClick={() => handleClick(post.id)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        cursor: 'pointer',
      }}
    >
      <h3 style={{ marginTop: 0 }}>{post.title}</h3>
      <p style={{ margin: '8px 0', color: '#555' }}>{post.content}</p>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <div>작성자: {user?.name ?? `user-${userId}`}</div>
        <div>카테고리 ID: {post.categoryId}</div>
        <div>현재 선택된 categoryId: {String(categoryId)}</div>
        <div>좋아요: {post.likes}</div>
        <div>작성일: {new Date(post.createdAt).toLocaleString()}</div>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
        {post.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 8px',
              backgroundColor: '#f3f3f3',
              borderRadius: '999px',
              fontSize: '12px',
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
  });
  // };

export default PostItem;