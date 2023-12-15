const mongoose = require('mongoose');

const otpTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    otpToken: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    verificado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const OtpToken = mongoose.model('OtpToken', otpTokenSchema);

module.exports = OtpToken;
