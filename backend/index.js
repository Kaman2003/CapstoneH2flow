import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bodyParser from "body-parser";

// Configure dotenv
dotenv.config();

// Initialize Firebase Admin SDK
// import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

// In your index.js
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n') // Handle newlines
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});


const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // Add all your frontend URLs
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable pre-flight requests

app.use(bodyParser.json());

// Import routes
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
