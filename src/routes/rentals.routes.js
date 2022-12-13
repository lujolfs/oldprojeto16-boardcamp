import { Router } from "express";
import { create, findAll, findById, update } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", create);
rentalsRouter.get("/rentals", findAll);
rentalsRouter.get("/rentals/:id", findById);
rentalsRouter.put("/rentals/:id", update);

export default rentalsRouter;