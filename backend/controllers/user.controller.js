import userModel from "../model/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistedToken from '../model/blacklistToken.model.js'

export const registerUser = async (request, response, next) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = request.body;
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return response.status(400).send({ message: "User already exist!" });
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
      first_name: fullname.first_name,
      lastname: fullname.lastname,
      email,
      password: hashPassword,
    });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    const token = user.generateAuthToken();
    return response.status(201).json({ token, user:userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    if (!email || !password) {
      return response
        .status(400)
        .send({ message: "invalid email or password" });
    }

    const user = await userModel.findOne({ email: email }).select("+password");
    if (!user) {
      return response
        .status(400)
        .send({ message: "invalid email or password" });
    }
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return response
          .status(401)
          .send({ message: "invalid email or password" });
      }
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      const token = user.generateAuthToken();
      response.cookie ('token',token)
      return response.status(200).send({ token, user:userWithoutPassword });
    }
  } catch (error) {
    next(error);
  }
};


export const getuserProfile =async (request,response)=>{
    response.status(200).send({
        user:request.user
    })
}

export const logoutUser = async(request,response,next)=>{
  response.clearCookie('token')
  const token = request.cookies.token || request.headers.authorization?.split(" ")[1]
  blacklistedToken.create({token})
  response.status(200).send({
    message:"Logged out"
  })
}