import type { PostFilterValues } from "../../types/filter";

type FilterParams = Partial<PostFilterValues>;

/**
 * URL 쿼리 파라미터 문자열을 필터 객체로 파싱
 */
export function parseFilterParams(searchString: string): FilterParams {
  const params = new URLSearchParams(searchString);
  
  return {
    categoryId: params.has('categoryId') ? Number(params.get('categoryId')) || null : null,
    query: params.get('query') ?? '',
    startDate: params.get('startDate') ?? '',
    endDate: params.get('endDate') ?? '',
    minLikes: params.get('minLikes') ?? '',
  };
}

/**
 * 필터 객체를 URL 쿼리 파라미터 문자열로 직렬화
 */
export function stringifyFilterParams(filters: FilterParams): string {
  const params = new URLSearchParams();

  if (filters.categoryId != null) {
    params.set('categoryId', String(filters.categoryId));
  }
  if (filters.query?.trim()) {
    params.set('query', filters.query);
  }
  if (filters.startDate) {
    params.set('startDate', filters.startDate);
  }
  if (filters.endDate) {
    params.set('endDate', filters.endDate);
  }
  if (filters.minLikes) {
    params.set('minLikes', filters.minLikes);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * 현재 URL에 쿼리 파라미터 적용
 */
export function updateFilterParamsInUrl(filters: FilterParams): void {
  const queryString = stringifyFilterParams(filters);
  const newUrl = `${window.location.pathname}${queryString}`;
  window.history.replaceState(null, '', newUrl);
}

/**
 * 현재 URL의 쿼리 파라미터 읽기
 */
export function getCurrentFilterParams(): FilterParams {
  return parseFilterParams(window.location.search);
}
