interface Article {
  _id?: string;
  author: Author;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: any[];
  title: string;
  updatedAt: string;
}
