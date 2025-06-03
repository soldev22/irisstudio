import mongoose from 'mongoose';

const PreCheckoutSchema = new mongoose.Schema({
  title: String,
  price: String,
  email: String,
  phone: String,
  name: String,
  address: String,
  city: String,
  postcode: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PreCheckout || mongoose.model('PreCheckout', PreCheckoutSchema);
