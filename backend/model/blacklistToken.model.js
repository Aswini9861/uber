import mongoose from "mongoose";

const blacklistedTokenSchema =new mongoose.Schema({
    token: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
      },
    });

    const blacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

    export default blacklistedToken;