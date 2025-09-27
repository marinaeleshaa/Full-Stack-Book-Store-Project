export interface IBook {
  _id?: string;
  title: string;
  description: string;
  Url: string;
  oldPrice: number | null;
  discountedPrice: number | null;
  publishedYear?: number;
  category: "action" | "drama" | "comedy" | "romance" | "horror" | "sci-fi";
}
