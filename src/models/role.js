// src/models/role.js
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // ADMIN_ONG, COORDINADOR, VOLUNTARIO, SOCIO
  },
  description: String,
});

module.exports = mongoose.model('Role', RoleSchema);
