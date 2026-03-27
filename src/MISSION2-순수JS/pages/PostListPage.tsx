import { useEffect, useMemo, useState, useCallback } from 'react'
import { fetchPosts, fetchUser } from '../../services/api';
import type { Post, User } from '../../types/post';
import UserProfile from '../../components/UserProfile';
import CategoryFilter from '../../components/Filter';
import AdvancedFilter from '../../components/Mission2Filter';
import PostItem from '../../components/PostItem';
import { filterPosts } from '../../utils/filterPosts';
import type { PostFilterValues } from '../../types/filter';

type AdvancedFilterValues = Omit<PostFilterValues, 'categoryId'>;

type PostListPageProps = {
  userId: number;
  categoryId?: number | null;
  onPostClick: (postId: number) => void;
  onCategoryChange: (categoryId: number | null) => void;
};

const PostListPage = ({ userId, categoryId, onPostClick, onCategoryChange }: PostListPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterValues>({
    startDate: '',
    endDate: '',
    minLikes: '',
    query: ''
  });

  const filteredPosts = useMemo(() => {
    const completeFilters: PostFilterValues = {
      ...advancedFilters,
      categoryId: categoryId ?? null,
    };
    return filterPosts(posts, completeFilters);
  }, [posts, advancedFilters, categoryId]);

  useEffect(() => {
    fetchPosts(userId, categoryId).then(data => {
      setPosts(data);
    });
  }, [categoryId]);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // 필터링된 posts를 최신순으로 정렬
  const sortedAndFilteredPosts = useMemo(() => {
    return [...filteredPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredPosts]);

  const handleClick = useCallback((postId: number) => {
    onPostClick(postId);
  }, [onPostClick]);

  const handleAdvancedFilterChange = useCallback((newFilters: AdvancedFilterValues) => {
    setAdvancedFilters(newFilters);
  }, []);

  return (

    <div>
      <UserProfile user={user} />
      <CategoryFilter
        selectedId={categoryId}
        onChange={onCategoryChange}
      />
      <AdvancedFilter
        filters={advancedFilters}
        onChange={handleAdvancedFilterChange}
      />
      {sortedAndFilteredPosts.map(post => (
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