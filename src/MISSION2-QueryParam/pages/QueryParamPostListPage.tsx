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
  }, [userId, categoryId]);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

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
