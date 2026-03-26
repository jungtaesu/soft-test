import { useState } from 'react';
import PostListPage from './pages/PostListPage';

function App() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
    console.log('App render')
  return (
    <PostListPage
      userId={1}
      categoryId={categoryId}
      onCategoryChange={setCategoryId}
      onPostClick={(id) => console.log(id)}
    />
  );
}

export default App;