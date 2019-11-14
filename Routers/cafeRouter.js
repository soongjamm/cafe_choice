import express from "express";
import routes from "../routes";
import { cafeDetail, review, map } from "../Controllers/cafeController";
//test
import { cafeInsert, cafeDeleteAll, cafeUpdate, reviewAdd } from "../Controllers/cafeController";
const cafeRouter = express.Router();

console.log(routes.reviewAdd());
cafeRouter.post(routes.reviewAdd(), reviewAdd);

cafeRouter.get(routes.map, map);

//test
cafeRouter.get(routes.cafeInsert, (req,res) => { res.send("test2"); });
cafeRouter.post(routes.cafeInsert, cafeInsert);
cafeRouter.post(routes.cafeDeleteAll, cafeDeleteAll);
// cafeRouter.post("/cafe-update", cafeUpdate);

cafeRouter.get(routes.cafeDetail(), cafeDetail);



export default cafeRouter;