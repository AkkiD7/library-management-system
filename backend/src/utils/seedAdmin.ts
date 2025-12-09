import { User } from "../models/User";
import bcrypt from "bcryptjs";

export const seedAdminUser = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (existingAdmin) return;

  const hashed = await bcrypt.hash("Admin@123", 10);

  await User.create({
    username: "admin",
    password: hashed,
    role: "admin",
  });

  console.log("Admin user created: username=admin, password=Admin@123");
};
