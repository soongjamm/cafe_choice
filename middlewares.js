import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
   res.locals.routes = routes;
   res.locals.siteName = "cafe.choice";

   res.locals.parking = "parking test";
   next();
}
