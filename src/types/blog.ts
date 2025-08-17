export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readingTime: number;
  citations?: Citation[];
  selfCitation?: string;
  toc?: TocItem[];
  draft?: boolean;
}

export interface Citation {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  bibtex: string;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  citations?: Citation[];
  selfCitation?: string;
  draft?: boolean;
}
