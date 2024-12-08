import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../model/user.model.js';
import blacklistedToken from '../model/blacklistToken.model.js';
import captainModel from '../model/captain.model.js';
dotenv.config();
export const authMiddleware = async(request,response,next)=>{
    try {
        const token = request.cookies.token || request.headers.authorization?.split(" ")[1]
        if(!token){
          return response.status(401).send({'message':"Unauthorized"})
      }
          const isblackListed = await blacklistedToken.findOne({"token":token})
          if(isblackListed){
            return response.status(401).send({'message':"Unauthorized"})

          }


        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        const user = await userModel.findById(decoded._id)

        request.user = user
        return next()

    } catch (error) {
        console.error(error.message);
        return response.status(400).send({"message":"Unauthorized"})

    }
}

export const captainMiddleware = async(request,response,next)=>{
  try {
    const token = request.cookies.token || request.headers.authorization?.split(" ")[1]
    if(!token){
      return response.status(401).send({message:"Unauthorized"})
    }
    const isblackListed = await blacklistedToken.findOne({"token":token})
          if(isblackListed){
            return response.status(401).send({'message':"Unauthorized"})

          }
          const decoded = jwt.verify(token,process.env.SECRET_KEY)
          const captain = await captainModel.findById(decoded._id)

          request.captain = captain
          return next()

  } catch (error) {
    console.error(error.message);
    return response.status(400).send({"message":"Unauthorized"})
  }
}