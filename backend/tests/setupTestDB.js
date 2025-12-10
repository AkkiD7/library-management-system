"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectTestDB = exports.connectTestDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectTestDB = async () => {
    const uri = "mongodb://127.0.0.1:27017/library_test_db";
    await mongoose_1.default.connect(uri);
};
exports.connectTestDB = connectTestDB;
const disconnectTestDB = async () => {
    await mongoose_1.default.connection.dropDatabase();
    await mongoose_1.default.disconnect();
};
exports.disconnectTestDB = disconnectTestDB;
//# sourceMappingURL=setupTestDB.js.map