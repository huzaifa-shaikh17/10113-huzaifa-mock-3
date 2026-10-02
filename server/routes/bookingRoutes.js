import { Router } from "express";
import bookingController from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter.post("/slots/:id/book", bookingController.bookSlot);

bookingRouter.get("/slots/:id/bookings", bookingController.getSlotBookings);

bookingRouter.patch("/bookings/:id/cancel", bookingController.cancelBooking);

export default bookingRouter;
