import { useMemo } from 'react';
import { postRules } from '../constants/postRules';
// @ts-ignore - JS 훅 시연용 파일을 TSX에서 직접 사용
import useForm from '../hooks/useJsForm';
import type { PostFormValues } from '../types/form';

const initialValues: PostFormValues = {
  title: '',
  content: '',
  tags: [],
  likesThreshold: '',
};

const AIBasedPostForm = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    postRules,
    initialValues
  );

  const tagInputValue = useMemo(() => values.tags.join(', '), [values.tags]);

  const onSubmit = (formValues: PostFormValues) => {
    console.log('제출 성공:', formValues);
    alert('폼 제출 성공');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: '640px', margin: '0 auto', padding: '24px' }}
    >
      <h2>게시글 작성 폼</h2>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={(e) => handleChange('title', e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: '8px' }}
        />
        {errors.title && (
          <p style={{ color: 'red', marginTop: '6px' }}>{errors.title}</p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={values.content}
          onChange={(e) => handleChange('content', e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            minHeight: '120px',
            marginTop: '8px',
          }}
        />
        {errors.content && (
          <p style={{ color: 'red', marginTop: '6px' }}>{errors.content}</p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="tags">태그 (쉼표로 구분)</label>
        <input
          id="tags"
          type="text"
          value={tagInputValue}
          onChange={(e) => {
            const parsedTags = e.target.value
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean);

            handleChange('tags', parsedTags);
          }}
          style={{ display: 'block', width: '100%', marginTop: '8px' }}
        />
        {errors.tags && (
          <p style={{ color: 'red', marginTop: '6px' }}>{errors.tags}</p>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="likesThreshold">좋아요 기준값</label>
        <input
          id="likesThreshold"
          type="number"
          value={values.likesThreshold}
          onChange={(e) => handleChange('likesThreshold', e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: '8px' }}
        />
        {errors.likesThreshold && (
          <p style={{ color: 'red', marginTop: '6px' }}>
            {errors.likesThreshold}
          </p>
        )}
      </div>

      <button type="submit">제출</button>
    </form>
  );
};

export default AIBasedPostForm;