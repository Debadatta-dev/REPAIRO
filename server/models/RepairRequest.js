const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    description: {
      type: String,
      required: true
    },

    imageUrl: {
      type: String
    },

    status: {
      type: String,
    enum: [
      "pending",
      "pickup_assigned",
      "picked",
      "in_transit",
      "delivered_to_shop",
      "diagnosed",
      "approved",
      "repair_in_progress",
      "repaired",
      "return_assigned",
      "returning",
      "completed",
      "rejected"
    ],
      default: "pending"
    },

    diagnosis: {
      issue: String,
      cost: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RepairRequest", repairRequestSchema);