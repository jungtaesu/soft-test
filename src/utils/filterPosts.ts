import type { PostFilterValues } from "../types/filter";
import type { Post } from "../types/post";

export function filterPosts(posts: Post[], filters: PostFilterValues) {
  return posts.filter((post) => {
    const matchesCategory =
      filters.categoryId == null || post.categoryId === filters.categoryId;

    const postDate = new Date(post.createdAt).getTime();

    const matchesStartDate =
      !filters.startDate || postDate >= new Date(filters.startDate).getTime();

    const matchesEndDate =
      !filters.endDate || postDate <= new Date(filters.endDate).getTime();

    const matchesLikes =
      !filters.minLikes || post.likes >= Number(filters.minLikes);

    const normalizedQuery = filters.query.trim().toLowerCase();
    const searchableText = `${post.title} ${post.content}`.toLowerCase();

    const matchesQuery =
      !normalizedQuery || searchableText.includes(normalizedQuery);

    return (
      matchesCategory &&
      matchesStartDate &&
      matchesEndDate &&
      matchesLikes &&
      matchesQuery
    );
  });
}