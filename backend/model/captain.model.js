import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "first name must be atleast 3 character"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 character long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    minlength: [6, "Email must be atleast 6 character long"],
  },
  password: {
    type: String,
    require: true,
    select: false,
    minlength: [6, "Password must be atleast 6 character long"],

  },
  socketid: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 character long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [6, "Plate number must be at least 6 character long"],
    },
    capacity: {
      type: String,
      required: true,
      minlength: [1, "Capacity must be at least 1"],
    },
  },
  vehicletype: {
    type: String,
    required: true,
    enum: ["car", "motorcycle", "auto"],
  },
  location: {
    lat: {
      type: Number,
    },
    lon: {
      type: Number,
    },
  },
});


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,{ expiresIn: '24h' });
    return token;
  };

  captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
  };


const captainModel = new mongoose.model("captain", captainSchema);

export default captainModel;


