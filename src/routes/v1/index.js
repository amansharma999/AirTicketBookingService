const express = require("express");
const { BookingController } = require("../../controllers/index");

const bookingController = new BookingController();

const router = express.Router();

router.post("/bookings", bookingController.create);
router.get("/bookings/:userId", bookingController.findBookingsByUserId);
router.patch("/bookings/cancel/:bookingId?", bookingController.cancelBooking);

router.post("/publish", bookingController.sendMessageToQueue);

module.exports = router;
