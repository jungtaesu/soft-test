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
  
  // Mission 2: 고급 필터 - categoryId 제외
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterValues>({
    startDate: '',
    endDate: '',
    minLikes: '',
    query: ''
  });

  // 카테고리와 고급 필터 통합
  const filteredPosts = useMemo(() => {
    const completeFilters: PostFilterValues = {
      ...advancedFilters,
      categoryId: categoryId ?? null,
    };
    return filterPosts(posts, completeFilters);
  }, [posts, advancedFilters, categoryId]);

  useEffect(() => {
    //도메인이 다르니까 따로 useEffect 분리
    // setLoading(true);
    fetchPosts(userId, categoryId).then(data => {
      setPosts(data);
      // setLoading(false);
    });
  }, [categoryId]);

  useEffect(() => {
    //도메인이 다르니까 따로 useEffect 분리
    fetchUser(userId).then(setUser);
  }, [userId]);

  // 필터링된 posts를 최신순으로 정렬
  const sortedAndFilteredPosts = useMemo(() => {
    return [...filteredPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredPosts]);

//   const sortedPosts = [...posts].sort((a, b) => 
//     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() 
// );

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
      {/* {sortedPosts.map(post => ( */}
      {sortedAndFilteredPosts.map(post => (
        <PostItem
          key={post.title}
          post={post}
          //handleClick는 부모에서 계속 새로 만들어지는 함수이기 때문에, PostItem이 memoization 되어도 handleClick이 바뀌어서 리렌더링이 된다.
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