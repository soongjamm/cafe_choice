import express from "express";
import passport from "passport";
import routes from "../routes"
import { getLogin, postLogin, logout, getJoin, postJoin, 
    githubLogin, postGithubLogin, kakaoLogin, postKakaoLogin, facebookLogin, postFacebookLogin}  from "../Controllers/userController";
import { home, search, conditionalSearch, ameIndex, postConditionalSearch, listAll, 
    getAddComment, postAddComment, getDeleteComment, postDeleteComment 
    , hashTag, getLike, postLike} from "../Controllers/cafeController";
import { onlyPublic , onlyPrivate} from "../middlewares";
const globalRouter = express.Router();


globalRouter.get(routes.addComment, getAddComment);
globalRouter.post(routes.addComment, postAddComment);
globalRouter.get(routes.deleteComment, getDeleteComment);
globalRouter.post(routes.deleteComment, postDeleteComment);
globalRouter.get(routes.like, getLike);
globalRouter.post(routes.like, postLike);




globalRouter.get(routes.listAll, listAll);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin,);


globalRouter.get(routes.github, onlyPublic, githubLogin);
globalRouter.get(
    routes.githubCallback, 
    passport.authenticate("github", {failureRedirect : "/login"}), 
    postGithubLogin
);


globalRouter.get(routes.kakao, onlyPublic, kakaoLogin);
globalRouter.get(
    routes.kakaoCallback, 
    passport.authenticate("kakao", {failureRedirect : "/login"}), 
    postKakaoLogin
);

// globalRouter.get(routes.facebook, onlyPublic, facebookLogin);
// globalRouter.get(
//     routes.facebookCallback, 
//     passport.authenticate("facebook", {failureRedirect : "/login"}), 
//     postFacebookLogin
// );




globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate ,logout);

globalRouter.get(routes.search, search);
globalRouter.get(routes.conditionalSearch, conditionalSearch);
globalRouter.post(routes.conditionalSearch, postConditionalSearch);

globalRouter.get(routes.ameIndex, ameIndex);

globalRouter.get(routes.hashTag, hashTag);



export default globalRouter;