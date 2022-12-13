import { Router } from "express";
import { create, findAll } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", create);
categoriesRouter.get("/categories", findAll);

export default categoriesRouter;