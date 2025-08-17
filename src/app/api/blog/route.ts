import { NextResponse } from 'next/server';
import { getAllPosts, getAllTags } from '@/lib/blog';

export async function GET() {
  try {
    const posts = await getAllPosts();
    const tags = getAllTags();
    
    return NextResponse.json({
      posts: posts || [],
      tags: tags || []
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return empty arrays instead of error to prevent frontend crash
    return NextResponse.json({
      posts: [],
      tags: []
    });
  }
}
