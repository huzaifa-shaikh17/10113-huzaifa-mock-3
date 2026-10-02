import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventSlot",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    rollNo: {
      type: String,
    },

    bookingStatus: {
      type: String,
      enum: ["Booked", "Cancelled"],
      default: "Booked",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("booking", bookingSchema);
export default Booking;
