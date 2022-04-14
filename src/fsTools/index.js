import fs from "fs-extra";
const { writeJson, readJson } = fs;
import { join } from "path";

const movieJsonPath = join(process.cwd() + "/src/movies/movies.json");

export const readMovie = async () => {
  let movie = await readJson(movieJsonPath);
  return movie;
};

export const addMovie = async (newMovie) => {
  if (newMovie) {
    let movie = await readMovie();
    movie.push(newMovie);

    writeJson(movieJsonPath, movie);

    return true;
  } else {
    return false;
  }
};

export const deleteMovie = async (id) => {
  let movies = await readMovie();
  console.log(movies);
  let foundMovie = movies.find((movie) => movie.imdbID === id);
  console.log(foundMovie);
  let index = movies.indexOf(foundMovie);

  if (index === -1) {
    return false;
  } else {
    movies.splice(index, 1);
    await writeJson(movieJsonPath, movies);
    return true;
  }
};

export const updateMovie = async (id,content) => {
    let movies = await readMovie();
    console.log(movies);
    let foundMovie = movies.find((movie) => movie.imdbID === id);
    console.log(foundMovie);
    let index = movies.indexOf(foundMovie);
    let updatedMovie = {...foundMovie, ...content}
  
    if (index === -1) {
      return false;
    } else {
      movies.splice(index, 1,updatedMovie);
      await writeJson(movieJsonPath, movies);
      return true;
    }
  };

  