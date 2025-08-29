import dotenv from "dotenv";
import app from "./app";
import connectDB from "../src/db/index";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`PMP listening on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });

