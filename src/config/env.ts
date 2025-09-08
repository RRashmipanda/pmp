import { SignOptions } from "jsonwebtoken";

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && !fallback) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return value || fallback!;
}

export const ENV = {
  MONGO_URI: getEnv("MONGO_URI"),
  PORT: getEnv("PORT", "5000"),
  ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: getEnv("ACCESS_TOKEN_EXPIRY", "1d") as SignOptions["expiresIn"],
  REFRESH_TOKEN_EXPIRY: getEnv("REFRESH_TOKEN_EXPIRY", "7d") as SignOptions["expiresIn"],
  CLIENT_URL: getEnv("CLIENT_URL", "http://localhost:5173"),

  SMTP_HOST: getEnv("SMTP_HOST"),
  SMTP_PORT: parseInt(getEnv("SMTP_PORT", "587"), 10),
  SMTP_USER: getEnv("SMTP_USER"),
  SMTP_PASS: getEnv("SMTP_PASS"),
};
