import express from "express";
import categoriesRouter from "./routes/categories.routes.js";
import gamesRouter from "./routes/games.routes.js";
import customersRouter from "./routes/customers.routes.js";
import rentalsRouter from "./routes/rentals.routes.js";
import dotenv from 'dotenv';
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));