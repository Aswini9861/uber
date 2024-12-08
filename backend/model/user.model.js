import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;
const userSchema = new Schema({
  fullname: {
    first_name: {
      type: String,
      require: true,
      minlength: [3, "first name must be atleast 3 character"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 character long"],
    },
  },
  email: {
    type: String,
    require: true,
    minlength: [6, "Email must be atleast 6 character long"],
  },
  password: {
    type: String,
    require: true,
    select: false,
    minlength: [6, "Password must be atleast 6 character long"],

  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,{ expiresIn: '24h' });
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = new mongoose.model("user", userSchema);

export default userModel;
