export type Role = "admin" | "user";

export type User = {
  id: string;
  username: string;
  role: Role;
};

export type BookStatus = "available" | "borrowed";

export type Book = {
  _id: string; 
  title: string;
  author: string;
  status: BookStatus;
  publishedYear: number;
  createdAt: string;
  updatedAt: string;
};

export type BookFormInput = {
  title: string;
  author: string;
  publishedYear: number;
};


export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T;
};
