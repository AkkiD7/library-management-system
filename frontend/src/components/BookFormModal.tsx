import React, { useState, useEffect } from "react";
import type { Book, BookFormInput } from "../types";
import { Button } from "./Button";
import { Input } from "./Input";
import { X } from "lucide-react";

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: BookFormInput) => Promise<void>;
  initialData?: Book;
  title: string;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: new Date().getFullYear().toString(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        author: initialData.author,
        publishedYear: initialData.publishedYear.toString(),
      });
    } else {
      setFormData({
        title: "",
        author: "",
        publishedYear: new Date().getFullYear().toString(),
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit({
        title: formData.title,
        author: formData.author,
        publishedYear: parseInt(formData.publishedYear, 10),
      });
      onClose();
    } catch (err) {
      setError("Failed to save book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-500/75"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 inline-block w-full max-w-lg rounded-lg bg-white text-left shadow-xl">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-slate-900">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            id="book-form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              id="title"
              label="Book Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="e.g. The Great Gatsby"
            />
            <Input
              id="author"
              label="Author"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              required
              placeholder="e.g. F. Scott Fitzgerald"
            />
            <Input
              id="year"
              type="number"
              label="Published Year"
              value={formData.publishedYear}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  publishedYear: e.target.value,
                })
              }
              required
              min="1000"
              max={new Date().getFullYear() + 1}
            />
          </form>
        </div>

        <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <Button
            type="submit"
            form="book-form"
            className="w-full sm:ml-3 sm:w-auto"
            isLoading={isSubmitting}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="mt-3 w-full sm:mt-0 sm:w-auto"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
