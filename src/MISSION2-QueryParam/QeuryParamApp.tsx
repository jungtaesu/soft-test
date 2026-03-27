import { useState, useEffect, useCallback } from 'react';
import QueryParamPostListPage from './pages/QueryParamPostListPage';
import { getCurrentFilterParams, updateFilterParamsInUrl } from './utils/filterParams';
import type { PostFilterValues } from '../types/filter';

type AdvancedFilterValues = Omit<PostFilterValues, 'categoryId'>;

function QueryParamApp() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterValues>({
    query: '',
    startDate: '',
    endDate: '',
    minLikes: '',
  });

  // 마운트 시: URL에서 필터값 읽기
  useEffect(() => {
    const params = getCurrentFilterParams();
    setCategoryId(params.categoryId ?? null);
    setAdvancedFilters({
      query: params.query ?? '',
      startDate: params.startDate ?? '',
      endDate: params.endDate ?? '',
      minLikes: params.minLikes ?? '',
    });
  }, []);

  // 카테고리 변경
  const handleCategoryChange = useCallback((newCategoryId: number | null) => {
    setCategoryId(newCategoryId);
    // URL 업데이트
    updateFilterParamsInUrl({
      categoryId: newCategoryId,
      ...advancedFilters,
    });
  }, [advancedFilters]);

  const handleAdvancedFilterChange = useCallback((newFilters: AdvancedFilterValues) => {
    setAdvancedFilters(newFilters);
    // URL 업데이트
    updateFilterParamsInUrl({
      categoryId,
      ...newFilters,
    });
  }, [categoryId]);

  console.log('쿼리파라미터App render', { categoryId, advancedFilters });

  return (
    <QueryParamPostListPage
      userId={1}
      categoryId={categoryId}
      advancedFilters={advancedFilters}
      onCategoryChange={handleCategoryChange}
      onAdvancedFilterChange={handleAdvancedFilterChange}
      onPostClick={(id) => console.log('Post clicked:', id)}
    />
  );
}

export default QueryParamApp;
