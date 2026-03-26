export interface Post {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  content: string;
  likes: number;
  tags: string[];
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
}