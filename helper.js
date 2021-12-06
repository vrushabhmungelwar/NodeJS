import { ObjectId } from "mongodb";
import { client } from "./index.js";
import bcrypt from "bcrypt";

async function updateMovieById(id, data) {
  return await client
    .db("movies")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
async function createMovies(data) {
  return await client.db("movies").collection("movies").insertMany(data);
}

async function addMovie(data) {
  return await client.db("movies").collection("movies").insertOne(data);
}

async function createUser(data) {
  return await client.db("movies").collection("users").insertOne(data);
}

async function createUser2(data) {
  return await client.db("movies").collection("users2").insertOne(data);
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
  return await client
    .db("movies")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
async function getMoviebyId(id) {
  return await client
    .db("movies")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

async function getUserByName(username) {
  return await client
    .db("movies")
    .collection("users")
    .findOne({ username: username });
}

async function getUserByEmail(email) {
  return await client
    .db("movies")
    .collection("users2")
    .findOne({ email: email });
}

async function genPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

async function genPassword2(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
}

export {
  getMovies,
  createMovies,
  getMoviebyId,
  deleteMovieById,
  updateMovieById,
  genPassword,
  createUser,
  getUserByName,
  addMovie,
  getUserByEmail,
  createUser2,
  genPassword2,
};
