import express from "express";
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

export const usersRouter = router;
