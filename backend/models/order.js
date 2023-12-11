// orders.model.js

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    orderId: {
      type: String,
      required: true,
      unique: true
    },
    products: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('orders', OrderSchema);

export default OrderModel;
