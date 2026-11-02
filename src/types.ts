export type NullableString = string | null;

export interface Source {
  id: string | null;
  name: string;
}

export type Article = {
  source: Source;
  author: NullableString;
  title: string;
  description: NullableString;
  url: string;
  urlToImage: NullableString;
  publishedAt: string;
  content: NullableString;
};

export interface SourcesResponse {
  status: string;
  sources: Source[];
}

export type NewsResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type NewsQueryParams = Partial<{
  q: string;
  sources: string;
  category: string;
  language: string;
}>;

export type ArticlePreview = Pick<Article, 'title' | 'urlToImage' | 'url'>;
export type ReadonlyArticle = Readonly<Article>;
