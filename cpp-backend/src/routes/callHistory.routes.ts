import { Router } from "express";
import { saveCall, getAllCalls } from "../controllers/callHistory.controller";

const router = Router();

router.post("/add", saveCall);
router.get("/all", getAllCalls);
// router.delete("/clear", clearCalls);

export default router;
