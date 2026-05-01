module.exports = {
  pending: ["pickup_assigned"],

  pickup_assigned: ["picked"],
  picked: ["in_transit"],
  in_transit: ["delivered_to_shop"],

  delivered_to_shop: ["diagnosed"],

  diagnosed: ["approved", "rejected"],

  approved: ["repair_in_progress"],
  repair_in_progress: ["repaired"],

  repaired: ["return_assigned"],

  return_assigned: ["returning"],
  returning: ["completed"]
};