import express from "express";
import { genericError } from "./errorHandlers/index.js";
import mediaRouter from "./services/index.js";
import { validateMedia } from "./errorHandlers/index.js";
const app = express();
const port = process.env.PORT;

/* global middle ware */

app.use(express.json());

/* routes */
app.use("/media", mediaRouter);

/* error handlers  */
app.use(validateMedia)
app.use(genericError);

app.listen(port, () => {
  console.log("listening at " + port);
});
