import express from "express";
import routes from "../routes"
import { getLogin, postLogin, logout, getJoin, postJoin } from "../Controllers/userController";
import { home, search, conditionalSearch, ameIndex, postConditionalSearch } from "../Controllers/cafeController";
import { onlyPublic } from "../middlewares";
const globalRouter = express.Router();


globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin,);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.search, search);
globalRouter.get(routes.conditionalSearch, conditionalSearch);
globalRouter.post(routes.conditionalSearch, postConditionalSearch);

globalRouter.get(routes.ameIndex, ameIndex);


export default globalRouter;