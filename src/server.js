import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  } catch (error) {
    console.log("Server not started", error);
    process.exit(1);
  }
};

await startServer();
