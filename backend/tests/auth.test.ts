import request from "supertest";
import app from "../src/app"; 
import { connectTestDB, disconnectTestDB } from "./setupTestDB";
import { User } from "../src/models/User";
import bcrypt from "bcryptjs";

describe("Auth APIs", () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user successfully", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "Password@123",
    });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.username).toBe("testuser");
    expect(res.body.data.role).toBe("user");
  });

  it("should login successfully with correct credentials", async () => {
    const hashed = await bcrypt.hash("Password@123", 10);
    await User.create({
      username: "loginuser",
      password: hashed,
      role: "user",
    });

    const res = await request(app).post("/auth/login").send({
      username: "loginuser",
      password: "Password@123",
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data.user.username).toBe("loginuser");
  });
});
