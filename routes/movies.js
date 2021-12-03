import express from "express";
import {
  getMovies,
  createMovies,
  getMoviebyId,
  deleteMovieById,
  updateMovieById,
} from "../helper.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router
.route("/")
.get(auth,async (request, response) => {
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
})

.post(async (request, response) => {
  const data = request.body;
  // console.log(data);
  const result = await createMovies(data);
  response.send(result);
});
router 
.route("/:id")
.get(async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const movie = await getMoviebyId(id);

  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "no matching movie found" });
})

.delete(async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const result = await deleteMovieById(id);

  result.deletedCount > 0
    ? response.send(result)
    : response.status(404).send({ message: "no matching movie found" });
})

.put(async (request, response) => {
  console.log(request.params);
  const { id } = request.params;
  const data = request.body;
  const result = await updateMovieById(id, data);
  const movie = await getMoviebyId(id);
  response.send(movie);
});

export const moviesRouter = router;
