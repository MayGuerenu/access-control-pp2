const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },

    tipoPersona: {
      type: String,
      enum: ['VOLUNTARIO', 'SOCIO', 'COORDINADOR', 'ADMIN'],
      default: 'VOLUNTARIO',
    },

    area: {
      type: String,
      enum: [
        'COMEDOR',
        'APOYO_ESCOLAR',
        'ROPERITO',
        'ADMINISTRACION',
        'EVENTOS',
        'OTRO',
      ],
      default: 'OTRO',
    },

    telefono: String,
    disponibilidad: String,
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash de password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
