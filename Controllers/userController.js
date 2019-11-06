import routes from "../routes";

export const getJoin = (req, res) =>{
    res.render("join", {pageTitle: "join"});
}

export const postJoin = (req, res) =>{
    res.redirect(routes.home);
}


export const postLogin = (req, res) =>{ 
    res.redirect(routes.home);
}

export const getLogin = (req, res) =>{ 
    res.render("login", {pageTitle: "login"});
}

export const logout = (req, res) =>{
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
