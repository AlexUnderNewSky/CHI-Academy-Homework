import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import bodyParser from "body-parser";
import express from "express";
import { AppDataSource } from "./data-source/data-source";

const app = createExpressServer({
  controllers: [UserController],
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    express.urlencoded({ extended: false }),
  ],
});

const initializeDatabase = async () => {
  await AppDataSource.initialize();  
}

initializeDatabase();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
