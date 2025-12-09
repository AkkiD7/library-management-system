import jwt from "jsonwebtoken";

interface Payload {
  id: string;
  username: string;
  role: string;
}

export const generateToken = (payload: Payload) => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = "1h";

  return jwt.sign(payload, secret, { expiresIn });
};
