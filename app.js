import express from "express";
import routes from "./routes";
import globalRouter from "./Routers/globalRouter";
import cafeRouter from "./Routers/cafeRouter";
import userRouter from "./Routers/userRouter";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import { localsMiddleware } from "./middlewares"


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