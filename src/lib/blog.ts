import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { BlogPost, BlogMetadata, TocItem } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Ensure the content directory exists
function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
  } catch (error) {
    console.warn('Could not create blog directory:', error);
  }
}

ensureDirectoryExists();

function extractTocFromContent(content: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const tocItems: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens

    tocItems.push({ id, text, level });
  }

  return tocItems;
}

function addHeadingIds(htmlContent: string, tocItems: TocItem[]): string {
  let updatedContent = htmlContent;
  
  tocItems.forEach(item => {
    const headingTag = `h${item.level}`;
    const regex = new RegExp(`<${headingTag}>([^<]*${item.text}[^<]*)</${headingTag}>`, 'i');
    updatedContent = updatedContent.replace(regex, `<${headingTag} id="${item.id}">$1</${headingTag}>`);
  });
  
  return updatedContent;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    
    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          return await getPostBySlug(slug);
        })
    );

    // Sort posts by date
    return allPostsData
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const metadata = data as BlogMetadata;
    
    // Process markdown content - step by step to avoid conflicts
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml, { sanitize: false })
      .process(content);

    let htmlContent = processedContent.toString();
    
    // Extract table of contents from content
    const tocItems = extractTocFromContent(content);
    
    // Add IDs to headings in HTML
    htmlContent = addHeadingIds(htmlContent, tocItems);
    
    // Process LaTeX math manually for now (simple approach)
    htmlContent = htmlContent.replace(/\$\$([^$]+)\$\$/g, '<div class="math-display">\\[$1\\]</div>');
    htmlContent = htmlContent.replace(/\$([^$]+)\$/g, '<span class="math-inline">\\($1\\)</span>');
    
    // Replace React component placeholders with proper JSX
    htmlContent = htmlContent.replace(/<BlogDemo \/>/g, '<div data-component="BlogDemo"></div>');
    
    // Calculate reading time (approximately 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: metadata.title,
      excerpt: metadata.excerpt,
      content: htmlContent,
      author: metadata.author,
      date: metadata.date,
      tags: metadata.tags || [],
      readingTime,
      citations: metadata.citations,
      toc: tocItems,
    };
  } catch (error) {
    console.error('Error processing post slug:', slug, error);
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const allTags = new Set<string>();
    
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .forEach((fileName) => {
        try {
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);
          const metadata = data as BlogMetadata;
          
          if (metadata.tags && Array.isArray(metadata.tags)) {
            metadata.tags.forEach((tag) => allTags.add(tag));
          }
        } catch (fileError) {
          console.warn(`Error reading file ${fileName}:`, fileError);
        }
      });
    
    return Array.from(allTags).sort();
  } catch (error) {
    console.error('Error getting all tags:', error);
    return [];
  }
}
