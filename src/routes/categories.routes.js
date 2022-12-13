import { Router } from "express";
import { create } from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", create);

export default categoriesRouter;