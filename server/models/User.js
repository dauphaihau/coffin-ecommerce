import mongoose from 'mongoose';

const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    address: {type: String},
    phone: {type: String},
    role: {type: Number, required: true},
    status: {type: Number, required: true}
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//   this.password = hash;
//   next();
// });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;