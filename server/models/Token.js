const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
    expires: 3600000
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600000
  },
});

module.exports = mongoose.models.Token || mongoose.model('Token', tokenSchema);