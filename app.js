import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import express from "express";
import flash from "req-flash";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import passport from "passport";
import routes from "./routes";
import session from "express-session";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./Routers/globalRouter";
import userRouter from "./Routers/userRouter";
import cafeRouter from "./Routers/cafeRouter";

const app = express();


app.set("view engine", "pug");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.cafes, cafeRouter);
app.use(routes.users, userRouter);



export default app ;