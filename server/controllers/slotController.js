import EventSlot from "../models/EventSlot.js";
import Booking from "../models/Booking.js";

const slotController = {
  createSlot: async (req, res) => {
    try {
      const { eventName, date, startTime, endTime, location, capacity } =
        req.body;

      if (
        !eventName ||
        !date ||
        !startTime ||
        !endTime ||
        !location ||
        !capacity
      ) {
        return res.status(400).json({
          success: false,
          message: "all fields are required...",
        });
      }

      if (capacity <= 0) {
        return res.status(400).json({
          success: false,
          message: "capacity atleast 1 or more...",
        });
      }

      const slot = await EventSlot.insertOne({
        eventName,
        date,
        startTime,
        endTime,
        location,
        capacity,
      });

      return res.status(201).json({
        success: true,
        message: "slot created successfully...",
        slot,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllSlots: async (req, res) => {
    try {
      const slots = await EventSlot.find({});

      return res.status(200).json({
        success: true,
        message: "all slots fetched successfully...",
        slots,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getSlot: async (req, res) => {
    try {
      const { id } = req.params;

      const slot = await EventSlot.findById(id);

      if (!slot) {
        return res.status(404).json({
          success: false,
          message: "slot not found...",
        });
      }

      const bookings = await Booking.countDocuments({
        slotId: id,
        bookingStatus: "Booked",
      });

      return res.status(200).json({
        success: true,
        message: "slot fetched successfully...",
        slot,
        bookings,
        availableSeats: slot.capacity - bookings,
      });
    } catch (error) {
      console.log(error.message);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteSlot: async (req, res) => {
    try {
      const { id } = req.params;

      const slot = await EventSlot.findByIdAndDelete(id);

      if (!slot) {
        return res.status(404).json({
          success: false,
          message: "slot not found...",
        });
      }

      return res.status(200).json({
        success: true,
        message: "slot deleted successfully...",
        slot,
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

export default slotController;
