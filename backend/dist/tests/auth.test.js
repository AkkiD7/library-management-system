"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const setupTestDB_1 = require("./setupTestDB");
const User_1 = require("../src/models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
describe("Auth APIs", () => {
    beforeAll(async () => {
        await (0, setupTestDB_1.connectTestDB)();
    });
    afterAll(async () => {
        await (0, setupTestDB_1.disconnectTestDB)();
    });
    beforeEach(async () => {
        await User_1.User.deleteMany({});
    });
    it("should register a new user successfully", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/auth/register").send({
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
        const hashed = await bcryptjs_1.default.hash("Password@123", 10);
        await User_1.User.create({
            username: "loginuser",
            password: hashed,
            role: "user",
        });
        const res = await (0, supertest_1.default)(app_1.default).post("/auth/login").send({
            username: "loginuser",
            password: "Password@123",
        });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.data).toHaveProperty("token");
        expect(res.body.data.user.username).toBe("loginuser");
    });
});
//# sourceMappingURL=auth.test.js.map