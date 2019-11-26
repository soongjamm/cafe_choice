import express from "express";
import routes from "../routes"
import { getLogin, postLogin, logout, getJoin, postJoin } from "../Controllers/userController";
import { home, search, conditionalSearch, ameIndex, postConditionalSearch } from "../Controllers/cafeController";

const globalRouter = express.Router();


globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout,logout);

globalRouter.get(routes.search, search);
globalRouter.get(routes.conditionalSearch, conditionalSearch);
globalRouter.post(routes.conditionalSearch, postConditionalSearch);

globalRouter.get(routes.ameIndex, ameIndex);


export default globalRouter;