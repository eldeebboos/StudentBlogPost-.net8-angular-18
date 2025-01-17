import { Category } from '../../category/models/category';

export interface Blogpost {
  id?: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: Category[];
  categoriesGuids: string[];
}
