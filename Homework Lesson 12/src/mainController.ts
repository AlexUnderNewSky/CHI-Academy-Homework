import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import bodyParser from "body-parser";
import express from "express";

const app = createExpressServer({
  controllers: [UserController],
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    express.urlencoded({ extended: false }),
  ],
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
