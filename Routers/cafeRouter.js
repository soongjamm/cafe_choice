import express from "express";
import routes from "../routes";
import { cafeDetail, review, map } from "../Controllers/cafeController";
//test
//import { cafeInsert, cafeDeleteAll, cafeUpdate } from "../Controllers/cafeController";
const cafeRouter = express.Router();

cafeRouter.get(routes.review, review);

cafeRouter.get(routes.map, map);

//test
// cafeRouter.get(routes.cafeInsert, (req,res) => { res.send("test"); });
// cafeRouter.post(routes.cafeInsert, cafeInsert);
// cafeRouter.post(routes.cafeDeleteAll, cafeDeleteAll);
// cafeRouter.post("/cafe-update", cafeUpdate);

cafeRouter.get(routes.cafeDetail(), cafeDetail);



export default cafeRouter;