import { api } from "../lib/apiClient";
import type { ApiResponse, Book, BookStatus } from "../types";

export const getBooksApi = async () => {
  const res = await api.get<ApiResponse<Book[]>>("/books");
  return res.data; 
};

type CreateBookPayload = {
  title: string;
  author: string;
  publishedYear: number;
  status?: BookStatus;
};

export const createBookApi = async (payload: CreateBookPayload) => {
  const res = await api.post<ApiResponse<Book>>("/books", payload);
  return res.data;
};

type UpdateBookPayload = Partial<CreateBookPayload>;

export const updateBookApi = async (id: string, payload: UpdateBookPayload) => {
  const res = await api.put<ApiResponse<Book>>(`/books/${id}`, payload);
  return res.data;
};

export const deleteBookApi = async (id: string) => {
  const res = await api.delete<ApiResponse<Book>>(`/books/${id}`);
  return res.data;
};

export const updateBookStatusApi = async (id: string, status: BookStatus) => {
  const res = await api.patch<ApiResponse<Book>>(`/books/${id}/status`, {
    status,
  });
  return res.data;
};
