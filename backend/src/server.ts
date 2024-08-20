import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import app from "./app";
import orderRoutes from "./routes/order.routes";
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoDBUri: string = process.env.MONGODB_URI!;
// Connect to MongoDB
mongoose
  .connect(
    mongoDBUri
  )
  .then(() => {
    console.log("Connected to the database");

    // Create HTTP server
    const httpServer = createServer(app);

    // Start the server
    httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    // Initialize WebSocket server
    const io = new Server(httpServer, {
      cors: {
        origin: "*", // Allow all origins, adjust for production
        methods: ["GET", "POST", "DELETE", "PUT"],
      },
    });

    // WebSocket connection handling
    io.on("connection", (socket) => {
      console.log("Admin connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("Admin disconnected:", socket.id);
      });
    });

    app.use("/api", orderRoutes(io));
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
