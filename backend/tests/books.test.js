"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const setupTestDB_1 = require("./setupTestDB");
const User_1 = require("../src/models/User");
const Book_1 = require("../src/models/Book");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../src/utils/generateToken");
let adminToken;
describe("Books APIs", () => {
    beforeAll(async () => {
        await (0, setupTestDB_1.connectTestDB)();
        await User_1.User.deleteMany({});
        const hashed = await bcryptjs_1.default.hash("Admin@123", 10);
        const admin = await User_1.User.create({
            username: "admin",
            password: hashed,
            role: "admin",
        });
        adminToken = (0, generateToken_1.generateToken)({
            id: admin._id.toString(),
            username: admin.username,
            role: admin.role,
        });
    });
    afterAll(async () => {
        await (0, setupTestDB_1.disconnectTestDB)();
    });
    beforeEach(async () => {
        await Book_1.Book.deleteMany({});
    });
    it("should fetch books (GET /books)", async () => {
        await Book_1.Book.create({
            title: "Book 1",
            author: "Author 1",
            status: "available",
            publishedYear: 2020,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/books")
            .set("Authorization", `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(1);
    });
    it("should create a book (POST /books)", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/books")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
            title: "The Alchemist",
            author: "Paulo Coelho",
            publishedYear: 1988,
            status: "available",
        });
        expect(res.status).toBe(201);
        expect(res.body.status).toBe(true);
        expect(res.body.data.title).toBe("The Alchemist");
    });
    it("should update a book (PUT /books/:id)", async () => {
        const book = await Book_1.Book.create({
            title: "Old Title",
            author: "Author",
            status: "available",
            publishedYear: 2000,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/books/${book._id}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
            title: "New Title",
        });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.data.title).toBe("New Title");
    });
    it("should update book status (PATCH /books/:id/status)", async () => {
        const book = await Book_1.Book.create({
            title: "Status Book",
            author: "Author",
            status: "available",
            publishedYear: 2010,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .patch(`/books/${book._id}/status`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ status: "borrowed" });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.data.status).toBe("borrowed");
    });
    it("should delete a book (DELETE /books/:id)", async () => {
        const book = await Book_1.Book.create({
            title: "To Delete",
            author: "Author",
            status: "available",
            publishedYear: 2015,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/books/${book._id}`)
            .set("Authorization", `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Book deleted successfully");
    });
});
//# sourceMappingURL=books.test.js.map