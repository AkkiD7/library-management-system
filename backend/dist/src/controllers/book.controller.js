"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookStatus = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBooks = void 0;
const Book_1 = require("../models/Book");
const getBooks = async (req, res) => {
    try {
        const books = await Book_1.Book.find();
        return res.status(200).json({
            status: true,
            message: "Books fetched successfully",
            data: books,
        });
    }
    catch (error) {
        console.error("Get books error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.getBooks = getBooks;
const createBook = async (req, res) => {
    try {
        const { title, author, status, publishedYear } = req.body;
        const book = await Book_1.Book.create({
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
    }
    catch (error) {
        console.error("Create book error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Book_1.Book.findByIdAndUpdate(id, req.body, {
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
    }
    catch (error) {
        console.error("Update book error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book_1.Book.findByIdAndDelete(id);
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
    }
    catch (error) {
        console.error("Delete book error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.deleteBook = deleteBook;
const updateBookStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await Book_1.Book.findByIdAndUpdate(id, { status }, { new: true });
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
    }
    catch (error) {
        console.error("Update status error", error);
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            data: null,
        });
    }
};
exports.updateBookStatus = updateBookStatus;
//# sourceMappingURL=book.controller.js.map