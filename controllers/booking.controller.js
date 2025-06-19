import Booking from '../models/booking.model.js';
import Product from '../models/product.model.js';
import * as response from '../helpers/response.helper.js';
import { v4 as uuidv4 } from 'uuid'; // For generating transaction IDs

// POST /api/bookings – Create a new booking
const createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { product_id, date, time } = req.body;

    const product = await Product.findById(product_id);
    if (!product) return response.error(res, { message: "Product not found" });

    const booking = new Booking({
      user_id: userId,
      product_id,
      date,
      time,
      payment_status: 'pending',
      status: 'initiated'
    });

    const savedBooking = await booking.save();
    return response.success(res, { message: 'Booking created', data: savedBooking });
  } catch (error) {
    console.error(error);
    return response.error(res, { message: 'Failed to create booking' });
  }
};

// GET /api/bookings/:id – Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('product_id user_id');
    if (!booking) return response.error(res, { message: 'Booking not found' });
    return response.success(res, { data: booking });
  } catch (error) {
    console.error(error);
    return response.error(res, { message: 'Failed to fetch booking' });
  }
};

// GET /api/user/bookings – Get bookings for logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.user._id }).populate('product_id');
    return response.success(res, { data: bookings });
  } catch (error) {
    console.error(error);
    return response.error(res, { message: 'Failed to fetch user bookings' });
  }
};

// POST /api/bookings/payment – Simulate payment initiation
const initiatePayment = async (req, res) => {
  try {
    const { booking_id } = req.body;
    const booking = await Booking.findById(booking_id);
    if (!booking) return response.error(res, { message: 'Booking not found' });

    // Simulate creating a payment request
    const paymentId = uuidv4();
    booking.payment_id = paymentId;
    booking.payment_status = 'initiated';
    await booking.save();

    return response.success(res, {
      message: 'Payment initiated',
      data: { payment_id: paymentId }
    });
  } catch (error) {
    console.error(error);
    return response.error(res, { message: 'Failed to initiate payment' });
  }
};

// POST /api/bookings/payment/verify – Simulate payment verification
const verifyPayment = async (req, res) => {
  try {
    const { booking_id, transaction_id } = req.body;

    const booking = await Booking.findById(booking_id);
    if (!booking) return response.error(res, { message: 'Booking not found' });

    booking.transaction_id = transaction_id || uuidv4();
    booking.payment_status = 'completed';
    booking.status = 'confirmed';
    await booking.save();

    return response.success(res, {
      message: 'Payment verified successfully',
      data: { booking }
    });
  } catch (error) {
    console.error(error);
    return response.error(res, { message: 'Payment verification failed' });
  }
};

export {
  createBooking,
  getBookingById,
  getUserBookings,
  initiatePayment,
  verifyPayment
};
