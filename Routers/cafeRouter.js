import express from "express";
import routes from "../routes";
import { cafeDetail, review, map } from "../Controllers/cafeController";

const cafeRouter = express.Router();

cafeRouter.get(routes.review, review);

cafeRouter.get(routes.map, map);

cafeRouter.get(routes.cafeDetail(), cafeDetail);


export default cafeRouter;