import mongoose from "mongoose";

const callHistorySchema = new mongoose.Schema({
  contactId: {
    type: String,
    required: true,
    unique: true,
  },
  customerNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Incoming", "Outgoing"],
    required: true,
  },
  date: String,
  startTime: String,
  endTime: String,
  status: {
    type: String,
    enum: ["Completed", "Missed", "Not Answered"],
    required: true,
  },
});

export const CallHistory = mongoose.model("CallHistory", callHistorySchema);
