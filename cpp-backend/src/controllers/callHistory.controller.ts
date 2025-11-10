import { Request, Response } from "express";
import { CallHistory } from "../models/CallHistory.model";

export const saveCall = async (req: Request, res: Response) => {
  try {
    const saved = await CallHistory.create(req.body);
    res.status(201).json(saved);
  } catch (error) {
    console.log("Error - [saveCall in callHistory.controller.ts]", error);
    res.status(500).json({ error });
  }
};

export const getAllCalls = async (req: Request, res: Response) => {
  try {
    const calls = await CallHistory.find().sort({ createdAt: -1 });
    res.status(200).json(calls);
  } catch (error) {
    console.log("Error - [getAllCalls in callHistory.controller.ts]", error);
    res.status(500).json({ error });
  }
};

// export const clearCalls = async (req: Request, res: Response) => {
//   try {
//     await CallHistory.deleteMany();
//     res.status(200).json({ message: "History cleared" });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };
