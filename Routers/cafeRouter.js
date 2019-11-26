import express from "express";
import routes from "../routes";
import { cafeDetail, map } from "../Controllers/cafeController";

const cafeRouter = express.Router();


cafeRouter.get(routes.map, map);
cafeRouter.get(routes.cafeDetail(), cafeDetail);

export default cafeRouter;