import userModel from "../model/user.model.js";

export const createUser = async({first_name, lastname, email, password}) => {
  if (!first_name || !email || !password) {

    throw new Error("All fields are required");
  }

  const user = new userModel({
    fullname: {
      first_name,
      lastname,
    },
    email,
    password,
  });
  await user.save();
  return user;
};
