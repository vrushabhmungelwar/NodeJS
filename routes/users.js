import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, genPassword, getUserByName } from "../helper.js";
const router = express.Router();

router.route("/signup").post(async (request, response) => {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);

  console.log(userFromDB);

  if (userFromDB) {
    response.status(400).send({ message: "username already exists" });
    return;
  }
  if (password.length < 8) {
    response.status(400).send({ message: "Password is not longer" });
    return;
  }

  const hashedPassword = await genPassword(password);
  const result = await createUser({ username, password: hashedPassword });
  response.send(result);
});

router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);

  if (!userFromDB) {
    response.status(401).send({ message: "Invalid credentials" });
    return;
  }

  const storedPassword = userFromDB.password;

  const isPasswordMatch = await bcrypt.compare(password, storedPassword);

  if (isPasswordMatch) {
    const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
    response.send({ message: "Successful login", token: token });
  } else {
    response.status(401).send({ message: "Invalid credentials" });
  }
});

export const usersRouter = router;
