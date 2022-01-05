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

  if (!userFromDB) {
    response.status(401).send({ message: "Invalid credentials1" });
    return;
  }

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

// router.route("/signin").post(
//   [
//     body("email", "enter a valid email").isEmail(),
//     body("password", "password cannot be blank").exists(),
//   ],
//   async (req, res) => {
//     let success = false;
//     const errors = validationResult({ req });
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//       let user = await User.findOne({ email });
//       if (!user) {
//         success = false;
//         return res
//           .status(400)
//           .json({ error: "please try to login with correct credentials" });
//       }

//       const passwordCompare = await bcrypt.compare(password, user.password);
//       if (!passwordCompare) {
//         success = false;
//         return res
//           .status(400)
//           .json({
//             success,
//             error: "please try to login with correct credentials",
//           });
//       }

//       const data = {
//         user: {
//           id: user.id,
//         },
//       };
//       const authtoken = jwt.sign(data, SECRET_KEY);
//       success = true;
//       res.json({ success, authtoken });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("internal srver error");
//     }
//   }
// );

