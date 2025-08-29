import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

export const dynamic = 'error';

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([
    getAllPosts(),
    getAllTags()
  ]);

  return <BlogPageClient posts={posts} tags={tags} />;
}