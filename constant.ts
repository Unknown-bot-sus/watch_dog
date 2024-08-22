import 'dotenv/config'
import { setupEmail } from './utils/email';

// Server
export const PORT = 3000;

// JWT
export const JWT_SECRET = process.env.JWT_SECRET || "test";
export const JWT_LIFETIME = process.env.JWT_LIFETIME || "2 days";

// Hashing
export const SALT_ROUNDS: number = process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10;

// Email
export const SENDER_EMAIL = process.env.SENDER_EMAIL || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
export const TRANSPORTER = setupEmail(SENDER_EMAIL, EMAIL_PASSWORD);