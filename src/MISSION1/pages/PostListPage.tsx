import { useEffect, useState, useCallback } from 'react'
import { fetchPosts, fetchUser } from '../../services/api';
import type { Post, User } from '../../types/post';
import UserProfile from '../../components/UserProfile';
import CategoryFilter from '../../components/Filter';
import PostItem from '../../components/PostItem';

type PostListPageProps = {
  userId: number;
  categoryId?: number | null;
  onPostClick: (postId: number) => void;
  onCategoryChange: (categoryId: number | null) => void;
};

const PostListPage = ({ userId, categoryId, onPostClick, onCategoryChange }: PostListPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //도메인이 다르니까 따로 useEffect 분리
    fetchPosts(userId, categoryId).then(data => {
      setPosts(data);
    });
  }, [categoryId]);

  useEffect(() => {
    //도메인이 다르니까 따로 useEffect 분리
    fetchUser(userId).then(setUser);
  }, [userId]);


  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() 
);

  const handleClick = useCallback((postId: number) => {
    onPostClick(postId);
  }, [onPostClick]);

  return (

    <div>
      <UserProfile user={user} />
      <CategoryFilter
        selectedId={categoryId}
        onChange={onCategoryChange}
      />
      {sortedPosts.map(post => (
        <PostItem
          key={post.title}
          post={post}
          handleClick={handleClick}
          user={user}
          userId={userId}
          categoryId={categoryId}
        />
      ))}
    </div>
  );
};

export default PostListPage;