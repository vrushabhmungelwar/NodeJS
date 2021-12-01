import { client } from "./index.js";

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

export {
  getMovies,
  createMovies,
  getMoviebyId,
  deleteMovieById,
  updateMovieById,
};
