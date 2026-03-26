import type { User } from '../../src/types/post';

export const mockUsers: User[] = [
  {
    id: 1,
    name: '예시 name',
    email: 'taesu@example.com',
    profileImage: 'https://via.placeholder.com/80',
    bio: 'React와 TypeScript를 사용하는 프론트엔드 개발자',
  },
  {
    id: 2,
    name: '김개발',
    email: 'devkim@example.com',
    profileImage: 'https://via.placeholder.com/80',
    bio: '웹 접근성과 UI 품질에 관심이 많은 개발자',
  },
];