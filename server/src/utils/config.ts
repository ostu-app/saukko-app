import dotenv from "dotenv";

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV!

export default {
  ENVIRONMENT,
  MONGODB_URI: ENVIRONMENT === 'test'
    ? process.env.TEST_MONGODB_URI!
    : process.env.MONGODB_URI!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS!,
  EMAIL_FROM_SENDER_DOMAIN: process.env.EMAIL_FROM_SENDER_DOMAIN,
  EMAIL_SERVICE_CONNECTION_STRING: process.env.EMAIL_SERVICE_CONNECTION_STRING,
  EMAIL_SERVICE_HOST: process.env.EMAIL_SERVICE_HOST!,
  EMAIL_SERVICE_PORT: process.env.EMAIL_SERVICE_PORT!,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE!,
  EMAIL_SERVICE_USER: process.env.EMAIL_SERVICE_USER!,
  EMAIL_SERVICE_PASSWORD: process.env.EMAIL_SERVICE_PASSWORD!,
  EMAIL_SERVICE_FROM: process.env.EMAIL_SERVICE_FROM!,
  APP_URL: process.env.APP_URL!,
  QUEUE_STORAGE_CONNECTION_STRING: process.env.QUEUE_STORAGE_CONNECTION_STRING,
}
