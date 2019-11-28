import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import User from "./models/users";
import routes from "./routes"
import { githubLoginCallback , kakaoLoginCallback, facebookLoginCallback } from "./Controllers/userController";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
)

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_APP_ID,
    clientSecret: process.env.KAKAO_APP_SECRET,
    callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    }, 
    kakaoLoginCallback
    )
)

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: `https://tender-husky-98.localtunnel.me${routes.facebookCallback}`
//     }, 
//     facebookLoginCallback
//     )
// )

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());