import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser2, genPassword2, getUserByEmail } from "../helper.js";
const router = express.Router();

router.route("/register").post(async (request, response) => {
  const { email, password } = request.body;

  const userFromDB = await getUserByEmail(email);

  console.log(userFromDB);

  if (userFromDB) {
    response.status(400).send({ message: "email already exists" });
    return;
  }
  if (password.length < 8) {
    response.status(400).send({ message: "Password is not longer" });
    return;
  }

  const hashedPassword = await genPassword2(password);
  const result = await createUser2({ email, password: hashedPassword });
  response.send(result);
});

router.route("/signin").post(async (request, response) => {
  const { email, password } = request.body;

  const userFromDB = await getUserByEmail(email);

//   if (!userFromDB) {
//     response.status(401).send({ message: "Invalid credentials1" });
//     return;
//   }

  const storedPassword = userFromDB.password;

  const isPasswordMatch = await bcrypt.compare(password, storedPassword);

  if (isPasswordMatch) {
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
    response.send({ message: "Successful login", token: token });
  console.log(userFromDB);

  } else {
    response.status(401).send({ message: "Invalid credentials" });
  }
});

export const users2Router = router;
