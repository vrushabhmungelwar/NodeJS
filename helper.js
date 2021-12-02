import { ObjectId } from "mongodb";
import { client } from "./index.js";

async function updateMovieById(id, data) {
  return await client
    .db("movies")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
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

export {
  getMovies,
  createMovies,
  getMoviebyId,
  deleteMovieById,
  updateMovieById,
};
