const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const bookingService = new BookingService();

class BookingController {

  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    const payload = {
      data: {
        subject: "This is a noti from queue",
        content: "Some queue will  subscribe this",
        recepientEmail: "example@gmail.com",
        notificationTime: "2024-09-30T03:54:05",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
    return res.status(StatusCodes.OK).json({
      message: "Successfully published the event",
      success: true,
      err: {},
      data: {},
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
  async findBookingsByUserId(req, res) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "User Id is required",
          success: false,
          err: {},
          data: {},
        });
      }
      const response = await bookingService.findBookingsByUserId(userId);
      return res.status(StatusCodes.OK).json({
        message: "Successfully fetched bookings",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
  async cancelBooking(req, res) {
    try {
      const bookingId = req.params.bookingId;

      if (!bookingId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Booking Id is required",
          success: false,
          err: {},
          data: {},
        });
      }
      const response = await bookingService.cancelBooking(bookingId);
      return res.status(StatusCodes.OK).json({
        message: "Successfully cancelled booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
