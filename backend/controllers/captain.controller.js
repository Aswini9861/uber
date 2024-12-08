import captainModel from "../model/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";
import blacklistedToken from "../model/blacklistToken.model.js";

export const registerCaptain = async(request,response,next)=>{
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
          }

    const { fullname, email, password,vehicle,vehicletype } = request.body;

    const isCaptainExist = await captainModel.findOne({ email: email });
    if(isCaptainExist){
      return response.status(400).send({ message: "Captain already exist!" });

    }
    const hashPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicletype,
      });
      const captainWithoutPassword = captain.toObject();
      delete captainWithoutPassword.password;

      const token = captain.generateAuthToken();
    return response.status(201).json({ token, captain:captainWithoutPassword });

    } catch (error) {
        return response.status(400).send({
            success:false,
            message:"Something went wrong while create captain",
            error: error.message || "An unknown error occurred"
        })

    }
}


export const loginCaptain = async(request,response,next)=>{
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

    const captain = await captainModel.findOne({ email: email }).select("+password");
    if (!captain) {
      return response
        .status(400)
        .send({ message: "invalid email or password" });
    }
    if (captain) {
      const isMatch = await captain.comparePassword(password);
      if (!isMatch) {
        return response
          .status(401)
          .send({ message: "invalid email or password" });
      }
      const captainWithoutPassword = captain.toObject();
      delete captainWithoutPassword.password;

      const token = captain.generateAuthToken();
      response.cookie ('token',token)
      return response.status(200).send({ token, captain:captainWithoutPassword });
    }
} catch (error) {
  console.error("Error during login Captain:", error);
  return response.status(500).send({
    message: "Something went wrong. Please try again later.",
  });
}}



export const getcaptainProfile =async (request,response)=>{
  console.log(request.captain)
  response.status(200).send({
      captain:request.captain
  })
}


export const logoutCaptain = async(request,response,next)=>{
  response.clearCookie('token')
  const token = request.cookies.token || request.headers.authorization?.split(" ")[1]
  blacklistedToken.create({token})
  response.status(200).send({
    message:"Logged out"
  })
}