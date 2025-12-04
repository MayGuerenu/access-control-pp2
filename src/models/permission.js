const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // ej: "GESTIONAR_VOLUNTARIOS"
  description: String,
});

module.exports = mongoose.model("Permission", PermissionSchema);
