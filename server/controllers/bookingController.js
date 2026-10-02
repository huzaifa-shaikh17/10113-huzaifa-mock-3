import Booking from "../models/Booking.js";
import EventSlot from "../models/EventSlot.js";

const bookingController = {
  bookSlot: async (req, res) => {
    try {
      const { id } = req.params;
      const { studentName, email, rollNo } = req.body;

      if (!studentName || !email) {
        return res.status(400).json({
          success: false,
          message: "student name and email are required...",
        });
      }

      const slot = await EventSlot.findById(id);

      if (!slot) {
        return res.status(404).json({
          success: false,
          message: "slot not found...",
        });
      }

      if (slot.status !== "Open") {
        return res.status(400).json({
          success: false,
          message: "slot is closed...",
        });
      }

      const bookings = await Booking.countDocuments({
        slotId: id,
        bookingStatus: "Booked",
      });

      if (bookings >= slot.capacity) {
        return res.status(400).json({
          success: false,
          message: "slot is full...",
        });
      }

      const booking = await Booking.create({
        slotId: id,
        studentName,
        email,
        rollNo,
        bookingStatus: "Booked",
      });

      return res.status(201).json({
        success: true,
        message: "slot booked successfully...",
        booking,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getSlotBookings: async (req, res) => {
    try {
      const { id } = req.params;

      const bookings = await Booking.find({
        slotId: id,
        bookingStatus: "Booked",
      });

      return res.status(200).json({
        success: true,
        message: "bookings fetched successfully...",
        bookings,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;

      const booking = await Booking.findByIdAndUpdate(
        id,
        {
          bookingStatus: "Cancelled",
        },
        {
          new: true,
        },
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "booking not found...",
        });
      }

      return res.status(200).json({
        success: true,
        message: "booking cancelled successfully...",
        booking,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default bookingController;
