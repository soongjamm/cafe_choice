import passport from "passport";
import routes from "../routes";

export const getJoin = (req, res) =>{
    res.render("join", {pageTitle: "join"});
}

export const postJoin = async (req, res, next) =>{
    
    
}


export const postLogin = (req,res) => {

}


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
