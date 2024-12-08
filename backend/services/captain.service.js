import captainModel from "../model/captain.model.js";



export const createCaptain = async({firstname, lastname, email, password,color,plate,capacity,vehicletype}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicletype) {

      throw new Error("All fields are required");
    }
   
    const captain = new captainModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle:{
        color,
        plate,
        capacity,
      },
      vehicletype,

    });
    await captain.save();
    return captain;
  };
