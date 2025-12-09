import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { Book, BookFormInput } from "../types";
import { Button } from "./Button";
import { BookFormModal } from "./BookFormModal"; 
import {
  Edit2,
  Trash2,
  Search,
  Filter,
  BookOpenCheck,
  BookX,
} from "lucide-react";
import {
  getBooksApi,
  createBookApi,
  updateBookApi,
  deleteBookApi,
  updateBookStatusApi,
} from "../lib/books";

export const BookList: React.FC = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "available" | "borrowed"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  const isAdmin = user?.role === "admin";

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooksApi(); 
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreate = async (bookData: BookFormInput) => {
    try {
      await createBookApi({
        title: bookData.title,
        author: bookData.author,
        publishedYear: bookData.publishedYear,
      });
      await fetchBooks();
    } catch (error) {
      console.error("Failed to create book", error);
    }
  };

  const handleUpdate = async (bookData: BookFormInput) => {
    if (!editingBook) return;
    try {
      await updateBookApi(editingBook._id, {
        title: bookData.title,
        author: bookData.author,
        publishedYear: bookData.publishedYear,
      });
      await fetchBooks();
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBookApi(id);
      await fetchBooks();
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  const toggleStatus = async (book: Book) => {
    try {
      const newStatus = book.status === "available" ? "borrowed" : "available";
      await updateBookStatusApi(book._id, newStatus);
      await fetchBooks();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const openCreateModal = () => {
    setEditingBook(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || book.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Library Books</h1>
        {isAdmin && <Button onClick={openCreateModal}>+ Add New Book</Button>}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-slate-400 h-4 w-4" />
          <select
            className="bg-transparent text-sm font-medium text-slate-700 border-none focus:ring-0 cursor-pointer"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "all" | "available" | "borrowed"
              )
            }
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="borrowed">Borrowed</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">
                        {book.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-500">
                        {book.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-500">
                        {book.publishedYear}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${
                          book.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(book)}
                          title={
                            book.status === "available"
                              ? "Borrow Book"
                              : "Return Book"
                          }
                          className={`${
                            book.status === "available"
                              ? "text-blue-600 hover:text-blue-900"
                              : "text-amber-600 hover:text-amber-900"
                          }`}
                        >
                          {book.status === "available" ? (
                            <BookOpenCheck className="h-4 w-4" />
                          ) : (
                            <BookX className="h-4 w-4" />
                          )}
                          <span className="ml-1">
                            {book.status === "available" ? "Borrow" : "Return"}
                          </span>
                        </Button>

                        {isAdmin && (
                          <>
                            <div className="h-4 w-px bg-slate-300 mx-1"></div>
                            <button
                              onClick={() => openEditModal(book)}
                              className="text-slate-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(book._id)}
                              className="text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No books found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BookFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingBook ? handleUpdate : handleCreate}
        initialData={editingBook}
        title={editingBook ? "Edit Book" : "Add New Book"}
      />
    </div>
  );
};
