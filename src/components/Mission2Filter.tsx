import { useCallback } from 'react';
import type { PostFilterValues } from '../types/filter';

type AdvancedFilterValues = Omit<PostFilterValues, 'categoryId'>;

type AdvancedFilterProps = {
  filters: AdvancedFilterValues;
  onChange: (filters: AdvancedFilterValues) => void;
};

const AdvancedFilter = ({ filters, onChange }: AdvancedFilterProps) => {
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...filters, query: e.target.value });
    },
    [filters, onChange]
  );

  const handleStartDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...filters, startDate: e.target.value });
    },
    [filters, onChange]
  );

  const handleEndDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...filters, endDate: e.target.value });
    },
    [filters, onChange]
  );

  const handleMinLikesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...filters, minLikes: e.target.value });
    },
    [filters, onChange]
  );

  const handleReset = useCallback(() => {
    onChange({
      query: '',
      startDate: '',
      endDate: '',
      minLikes: '',
    });
  }, [onChange]);

  return (
    <section style={{ marginBottom: '16px', padding: '12px', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <strong style={{ display: 'block', marginBottom: '12px' }}>
        고급 필터 (Mission 2)
      </strong>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        {/* 검색어 */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            검색어
          </label>
          <input
            type="text"
            placeholder="제목이나 내용으로 검색..."
            value={filters.query}
            onChange={handleQueryChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 최소 좋아요 */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            최소 좋아요
          </label>
          <input
            type="number"
            placeholder="예: 5"
            value={filters.minLikes}
            onChange={handleMinLikesChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 시작 날짜 */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            시작 날짜
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={handleStartDateChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 종료 날짜 */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            종료 날짜
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={handleEndDateChange}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* 초기화 버튼 */}
      <button
        type="button"
        onClick={handleReset}
        style={{
          padding: '8px 12px',
          backgroundColor: '#e0e0e0',
          border: '1px solid #999',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        필터 초기화
      </button>
    </section>
  );
};

export default AdvancedFilter;
