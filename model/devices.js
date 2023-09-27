const mongoose = require("mongoose");

const DevicesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: "off" },
    type: { type: String, required: true },
    mode: { type: String, default: "auto" },
    icon: { type: String, required: false },
    data: { type: Object, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Devices", DevicesSchema);