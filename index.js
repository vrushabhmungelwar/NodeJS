// const express = require("express");  //  "type": "common.js",
import express from "express"; //   "type": "module",
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";

dotenv.config();
console.log(process.env);

const app = express();

// const PORT = 9000;
const PORT = process.env.PORT;


app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb Connected");
  return client;
}
export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("hello, ***😅");
});

app.use("/movies",moviesRouter)

app.listen(PORT, () => console.log("App is started", PORT));
