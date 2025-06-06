import mongoose, { Schema, Document } from 'mongoose';

const BookingSchema = new Schema({
  date: String, // e.g. '2025-06-06'
  time: String, // e.g. '09:00'
  name: String,
  email: String,
  phone: String,
  notes: String,
  people: Number,
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
