import { Router } from "express";
import slotController from "../controllers/slotController.js";

const slotRouter = Router();

slotRouter.post("/", slotController.createSlot);
slotRouter.get("/", slotController.getAllSlots);
slotRouter.get("/:id", slotController.getSlot);
slotRouter.delete("/:id", slotController.deleteSlot);

export default slotRouter;
