import request from "supertest";
import app from "../src/app";
import { connectTestDB, disconnectTestDB } from "./setupTestDB";
import { User } from "../src/models/User";
import { Book } from "../src/models/Book";
import bcrypt from "bcryptjs";
import { generateToken } from "../src/utils/generateToken";

let adminToken: string;

describe("Books APIs", () => {
  beforeAll(async () => {
    await connectTestDB();

    await User.deleteMany({});

    const hashed = await bcrypt.hash("Admin@123", 10);
    const admin = await User.create({
      username: "admin",
      password: hashed,
      role: "admin",
    });

    adminToken = generateToken({
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    });
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await Book.deleteMany({});
  });

  it("should fetch books (GET /books)", async () => {
    await Book.create({
      title: "Book 1",
      author: "Author 1",
      status: "available",
      publishedYear: 2020,
    });

    const res = await request(app)
      .get("/books")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it("should create a book (POST /books)", async () => {
    const res = await request(app)
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
    const book = await Book.create({
      title: "Old Title",
      author: "Author",
      status: "available",
      publishedYear: 2000,
    });

    const res = await request(app)
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
    const book = await Book.create({
      title: "Status Book",
      author: "Author",
      status: "available",
      publishedYear: 2010,
    });

    const res = await request(app)
      .patch(`/books/${book._id}/status`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ status: "borrowed" });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data.status).toBe("borrowed");
  });

  it("should delete a book (DELETE /books/:id)", async () => {
    const book = await Book.create({
      title: "To Delete",
      author: "Author",
      status: "available",
      publishedYear: 2015,
    });

    const res = await request(app)
      .delete(`/books/${book._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Book deleted successfully");
  });
});
