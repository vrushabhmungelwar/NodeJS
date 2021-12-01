// const express = require("express");  //  "type": "common.js",
import express from "express"; //   "type": "module",
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env)

const app = express();

const PORT = 9000;

app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL =  process.env.MONGO_URL;
//   "mongodb+srv://vrushabh:welcome123@cluster0.zksv2.mongodb.net";
// mongodb+srv://vrushabh:<password>@cluster0.zksv2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb Connected");
  return client;
}
const client = await createConnection();

app.get("/", (request, response) => {
  response.send("hello, !!!😅");
});

app.get("/movies", async (request, response) => {
  console.log(request.query);
  const filter = request.query;
  console.log(filter);
  if (filter.rating) {
    filter.rating = +filter.rating;
  }
  // const { language, rating } = request.query;
  // const {rating} = request.query;

  // let filterMovies = movies;

  // if (language) {
  //   filterMovies = filterMovies.filter((mv) => mv.language === language);
  // }

  // if (rating) {
  //   filterMovies = filterMovies.filter((mv) => mv.rating === +rating);
  // }
  const filterMovies = await getMovies(filter);
  // console.log(filterMovies);
  response.send(filterMovies);
});

app.post("/movies", async (request, response) => {
  const data = request.body;
  // console.log(data);
  const result = await createMovies(data);
  response.send(result);
});

app.get("/movies/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const movie = await getMoviebyId(id);

  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "no matching movie found" });
});

app.delete("/movies/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const result = await deleteMovieById(id);

  result.deletedCount > 0
    ? response.send(result)
    : response.status(404).send({ message: "no matching movie found" });
});

app.put("/movies/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const data = request.body;
  const result = await updateMovieById(id, data);
const movie = await getMoviebyId(id);
  response.send(movie);
});

app.listen(PORT, () => console.log("App is started", PORT));
async function updateMovieById(id, data) {
  return await client
    .db("movies")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}

async function createMovies(data) {
  return await client.db("movies").collection("movies").insertMany(data);
}

async function getMovies(filter) {
  return await client
    .db("movies")
    .collection("movies")
    .find(filter)
    // .limit(2)
    .toArray();
}

async function deleteMovieById(id) {
  return await client.db("movies").collection("movies").deleteOne({ id: id });
}

async function getMoviebyId(id) {
  return await client.db("movies").collection("movies").findOne({ id: id });
}
