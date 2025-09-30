export interface IBook {
  _id?: string;
  title: string;
  description: string;
  Url: string;
  oldPrice: number | null;
  discountedPrice: number | null;
  publishedYear?: number;
  category: "action" | "drama" | "comedy" | "romance" | "horror" | "sci-fi";

  createdBy: {
    _id:string
  }
}

export interface IUser {
  // id?: string; // لازم عشان بتستخدميه في toggleDropdown و handleRoleChange
  username: string; // لازم عشان بتعرضيه
  email: string; // لازم برضه
  role: "user" | "admin"; // بتبدليه بين قيمتين بس

  // الحقول دي ممكن تخليها optional لو محتاجة في مكان تاني
  _id: string;
  password?: string;
}

