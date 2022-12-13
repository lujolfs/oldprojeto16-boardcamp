import express from "express";
import categoriesRouter from "./routes/categories.routes.js";
import gamesRouter from "./routes/games.routes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(categoriesRouter);
app.use(gamesRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));