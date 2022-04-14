import express from "express";
import createError from "http-errors";
import {
  readMovie,
  addMovie,
  deleteMovie,
  updateMovie,
} from "../fsTools/index.js";
import uniqid from "uniqid";
import multer from "multer"
import package1 from "cloudinary"
const {v2:cloudinary} = package1
import package2 from "multer-storage-cloudinary"
const { CloudinaryStorage } =package2
/* const mobibe = async()=>{
    let a= await deleteMovie("ydw95v4vol1yzeb6b");
    console.log(a);
}
mobibe()  */

const uploadtoCloudinary = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params:{
            folder: "strive"
        }

    })
}).single("poster")
console.log(uploadtoCloudinary);

let movie = {
  Title: "The Lord of the Rings: The Fellowship of the Ring",
  Year: "2001",
  imdbID: "tt0120737", //UNIQUE
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg4MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_SX300.jpg",
};

const mediaRouter = express.Router();

mediaRouter.post("/", (req, res, next) => {
  try {
    if (!req.body.title) {
      next(createError(400, "include a title"));
    } else {
      let newMovie = { ...req.body, imdbID: uniqid() };

      addMovie(newMovie);
      res.status(201).send("movie added with id" + " " + newMovie.imdbID);
    }
  } catch (error) {
    next(createError(400, "you cant add movie now try again"));
  }
});

mediaRouter.get("/:id", async (req, res, next) => {
  try {
    let movies = await readMovie();
    let foundMovie = movies.find((movie) => movie.imdbID === req.params.id);
    foundMovie
      ? res.status(200).send(foundMovie)
      : next(createError(400, "movie not found"));
  } catch (error) {
    next(error);
  }
});

mediaRouter.delete("/:id", async (req, res, next) => {
  try {
    let isMovieDeleted = await deleteMovie(req.params.id);
    if (!isMovieDeleted) {
      next(createError(400, "the movie you wish to delete does not exist"));
    } else {
      res.status(200).send("movie deleted");
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.put("/:id", async (req, res, next) => {
  try {
    let isMovieUpdated = await updateMovie(req.params.id, req.body);

    if (isMovieUpdated) {
      res.status(200).send("movie updated");
    } else {
      next(createError(400, "the movie you wish to update does not exist"));
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/", async (req, res, next) => {
  try {
    let movies = await readMovie();
    res.status(200).send(movies);
  } catch (error) {
    next(createError(400, "something is wrong try again later"));
  }
});

mediaRouter.put("/poster/:id", uploadtoCloudinary,async(req,res, next)=>{

    try {
        let isMovieUpdated = await updateMovie(req.params.id, {"poster":req.file.path});
    
        if (isMovieUpdated) {
          res.status(200).send("poster added to movie");
        } else {
          next(createError(400, "the movie you wish to update does not exist"));
        }
      } catch (error) {
        next(error);
      }

})

export default mediaRouter;
