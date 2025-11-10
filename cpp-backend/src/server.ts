import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import callHistoryRoutes from "./routes/callHistory.routes";

dotenv.config();

mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log("MongoDB Connected");
});

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.use("/api/calls", callHistoryRoutes);

app.listen(5000, () => console.log(`Server running on port ${port}`));
