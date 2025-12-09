import { Request, Response } from "express";
import { Book } from "../models/Book";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();

    return res.status(200).json({
      status: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (error) {
    console.error("Get books error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, status, publishedYear } = req.body;

    const book = await Book.create({
      title,
      author,
      status: status || "available",
      publishedYear,
    });

    return res.status(201).json({
      status: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error("Create book error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        status: false,
        message: "Book not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Book updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update book error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Book.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Book not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Book deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error("Delete book error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

export const updateBookStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Book.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        status: false,
        message: "Book not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Book status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update status error", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: null,
    });
  }
};

