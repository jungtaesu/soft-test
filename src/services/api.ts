import { mockPosts } from '../../public/mocks/posts';
import { mockUsers } from '../../public/mocks/user';
import type { Post, User } from '../types/post';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchPosts(
  userId: number,
  categoryId?: number | null
): Promise<Post[]> {
  await delay(300);

  let filteredPosts = mockPosts.filter((post) => post.userId === userId);

  if (categoryId != null) {
    filteredPosts = filteredPosts.filter((post) => post.categoryId === categoryId);
  }

  return filteredPosts;
}

export async function fetchUser(userId: number): Promise<User | null> {
  await delay(200);

  const user = mockUsers.find((user) => user.id === userId) ?? null;
  return user;
}