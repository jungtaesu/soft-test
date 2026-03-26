import { useEffect, useMemo, useCallback, useState } from 'react'
import { fetchPosts, fetchUser } from '../../services/api';
import type { Post, User } from '../../types/post';
import UserProfile from '../../components/UserProfile';
import CategoryFilter from '../../components/Filter';
import AdvancedFilter from '../../components/Mission2Filter';
import PostItem from '../../components/PostItem';
import { filterPosts } from '../../utils/filterPosts';
import type { PostFilterValues } from '../../types/filter';

type AdvancedFilterValues = Omit<PostFilterValues, 'categoryId'>;

type QueryParamPostListPageProps = {
  userId: number;
  categoryId: number | null;
  advancedFilters: AdvancedFilterValues;
  onPostClick: (postId: number) => void;
  onCategoryChange: (categoryId: number | null) => void;
  onAdvancedFilterChange: (filters: AdvancedFilterValues) => void;
};

const QueryParamPostListPage = ({
  userId,
  categoryId,
  advancedFilters,
  onPostClick,
  onCategoryChange,
  onAdvancedFilterChange,
}: QueryParamPostListPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // 카테고리와 고급 필터 통합
  const filteredPosts = useMemo(() => {
    const completeFilters: PostFilterValues = {
      ...advancedFilters,
      categoryId: categoryId ?? null,
    };
    return filterPosts(posts, completeFilters);
  }, [posts, advancedFilters, categoryId]);

  useEffect(() => {
    // 도메인이 다르니까 따로 useEffect 분리
    fetchPosts(userId, categoryId).then(data => {
      setPosts(data);
    });
  }, [userId, categoryId]);

  useEffect(() => {
    // 도메인이 다르니까 따로 useEffect 분리
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

  return (
    <div>
      <UserProfile user={user} />
      <CategoryFilter
        selectedId={categoryId}
        onChange={onCategoryChange}
      />
      <AdvancedFilter
        filters={advancedFilters}
        onChange={onAdvancedFilterChange}
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

export default QueryParamPostListPage;
