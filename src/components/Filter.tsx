type CategoryFilterProps = {
  selectedId?: number | null;
  onChange: (id: number | null) => void;
};

const categories = [
  { id: null, label: '전체' },
  { id: 10, label: 'React' },
  { id: 20, label: 'TypeScript' },
  { id: 30, label: 'Frontend' },
];

const CategoryFilter = ({
  selectedId,
  onChange,
}: CategoryFilterProps) => {
  return (
    <section style={{ marginBottom: '16px' }}>
      <strong style={{ display: 'block', marginBottom: '8px' }}>
        카테고리
      </strong>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {categories.map((category) => {
          const isSelected = selectedId === category.id;

          return (
            <button
              key={String(category.id)}
              type="button"
              onClick={() => onChange(category.id)}
              style={{
                padding: '8px 12px',
                borderRadius: '999px',
                border: '1px solid #ccc',
                backgroundColor: isSelected ? '#222' : '#fff',
                color: isSelected ? '#fff' : '#222',
                cursor: 'pointer',
              }}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFilter;