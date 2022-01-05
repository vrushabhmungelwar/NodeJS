import express from "express";
import { getDogs } from "../helper.js";
const router = express.Router();
router
.route("/")
.get(async (request, response) => {
  console.log(request.query);
  const data = request.query;
  const dogsData = await getDogs(data);
  response.send(dogsData);
})


export const dogsRouter = router;