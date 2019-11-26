import passport from "passport";
import routes from "../routes";
import User from "../models/users";

export const getJoin = (req, res) =>{
    res.render("join", {pageTitle: "join"});
}

export const postJoin = async (req, res, next) =>{
    const {
        body: { name, email, password, password2 }
      } = req;
      if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
      } else {
        try {
          const user = await User({
            name,
            email
          });
          await User.register(user, password);
          next();
        } catch (error) {
          console.log(error);
          res.redirect(routes.home);
        }
      }
    
}


export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
  });


export const getLogin = (req, res) =>{ 
    res.render("login", {pageTitle: "login"});
}

export const logout = (req, res) =>{
    req.logout();
    res.redirect(routes.home);
}

export const userDetail = (req, res) =>{
    res.send("this is user-Detail");
}

export const editProfile = (req, res) =>{
    res.send("this is edit-Profile");
}

export const changePassword = (req, res) =>{
    res.send("this is change-Password");
}
