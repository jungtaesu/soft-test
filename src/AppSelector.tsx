import { useState } from 'react';
import Mission1App from './MISSION1/App';
import MISSION2순수JS from './MISSION2-순수JS/App';
import QeuryParamApp from './MISSION2-QueryParam/QeuryParamApp';
import PostForm from './MISSION3/components/postForm';
import AI기반PostForm from './MISSION3/components/AI기반PostForm';

type AppMode = 'state' | 'queryParam' | 'postForm' | 'aiPostForm' | 'default';

/**
 * AppSelector: 앱 모드를 선택할 수 있는 컴포넌트
 */
const AppSelector = () => {
  const [mode, setMode] = useState<AppMode>(() => {
    // localStorage에서 저장된 모드 읽기, 없으면 'default' 기본값
    return (localStorage.getItem('appMode') as AppMode) || 'default';
  });

  // 모드 변경 시 localStorage에 저장
  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
    localStorage.setItem('appMode', newMode);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* 선택 버튼 헤더 */}
      <div
        style={{
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderBottom: '2px solid #ddd',
          marginBottom: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <strong>필터 방식 선택:</strong>
        <button
          onClick={() => handleModeChange('default')}
          style={{
            padding: '8px 16px',
            backgroundColor: mode === 'default' ? '#222' : '#fff',
            color: mode === 'default' ? '#fff' : '#222',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: mode === 'default' ? 'bold' : 'normal',
          }}
        >
          🔷 미션1
        </button>
        <button
          onClick={() => handleModeChange('state')}
          style={{
            padding: '8px 16px',
            backgroundColor: mode === 'state' ? '#222' : '#fff',
            color: mode === 'state' ? '#fff' : '#222',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: mode === 'state' ? 'bold' : 'normal',
          }}
        >
          🔷 미션2순수JS
        </button>
        <button
          onClick={() => handleModeChange('queryParam')}
          style={{
            padding: '8px 16px',
            backgroundColor: mode === 'queryParam' ? '#222' : '#fff',
            color: mode === 'queryParam' ? '#fff' : '#222',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: mode === 'queryParam' ? 'bold' : 'normal',
          }}
        >
          🔗 미션2쿼리파라미터
        </button>
        <button
          onClick={() => handleModeChange('postForm')}
          style={{
            padding: '8px 16px',
            backgroundColor: mode === 'postForm' ? '#222' : '#fff',
            color: mode === 'postForm' ? '#fff' : '#222',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: mode === 'postForm' ? 'bold' : 'normal',
          }}
        >
          📝 미션3 PostForm
        </button>
        <button
          onClick={() => handleModeChange('aiPostForm')}
          style={{
            padding: '8px 16px',
            backgroundColor: mode === 'aiPostForm' ? '#222' : '#fff',
            color: mode === 'aiPostForm' ? '#fff' : '#222',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: mode === 'aiPostForm' ? 'bold' : 'normal',
          }}
        >
          🤖 미션3AI 기반 PostForm
        </button>
      </div>

      {/* 선택된 앱 렌더링 */}
      <div style={{ padding: '0 16px' }}>
        {mode === 'default' && <Mission1App />}
        {mode === 'state' && <MISSION2순수JS />}
        {mode === 'queryParam' && <QeuryParamApp />}
        {mode === 'postForm' && <PostForm />}
        {mode === 'aiPostForm' && <AI기반PostForm />}
      </div>
    </div>
  );
};

export default AppSelector;
