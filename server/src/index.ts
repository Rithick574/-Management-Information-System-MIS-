import dotenv from "dotenv";
import app from "./server";
import sequelize from "./config/database";

dotenv.config();

(async () => {
  try {
    if (!process.env.PORT) {
      throw new Error("PORT number not provided in environment variables");
    }

    if (!process.env.RENDER_DB_URL) {
      throw new Error(
        "PostgreSQL connection string not provided in environment variables"
      );
    }

    await sequelize.authenticate();
    console.log("🍃🍃🍃🍃🍃🍃Successfully connected to PostgreSQL🍃🍃🍃🍃🍃🍃");

    await sequelize.sync();
    console.log("Database synced");

    app;
  } catch (error) {
    console.error("Error starting the application:", error);
    process.exit(1);
  }
})();
