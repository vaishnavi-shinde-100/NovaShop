const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],

    name: String,
    phone: String,
    address: String,
    city: String,
    payment: String,

    totalAmount: {
      type: Number,
      require: true,
    },

    status: {
      type: String,
      enum: ["Placed", "Shipped", "Out for Delivery", "Delivered"],
      default: "Placed",
    },

    address: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
