import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db.js";
import path from "path";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import cookieParser from "cookie-parser";
// dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

const PORT =  4000;
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL"))
  .catch((error) => console.error("Database connection error:", error));

sequelize
  .sync()
  .then(() => console.log("Models synchronized with MySQL"))
  .catch((error) => console.error("Error syncing models:", error));

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
