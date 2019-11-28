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

      var msg;
      const exUser = await User.findOne({email});

      if ((password !== password2) || password.length < 6) {
        msg = "비밀번호가 6글자 미만이거나 일치하지 않습니다.";
        res.status(400);
        res.render("join", { pageTitle: "Join" ,msg});
      } else if(exUser){
        msg = "이미 존재하는 이메일 입니다.";
        res.render("join", { pageTitle: "Join" ,msg});
      } else if(name.length > 30 || email.length >40 || password.length >16 || password.length>16){
        msg = "입력이 너무 깁니다.";
        res.render("join", { pageTitle: "Join" ,msg});
      }else {
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
    
    
    
export const getLogin = (req, res) =>{ 
  res.render("login", {pageTitle: "login"});
};
    
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
  }
);


export const logout = (req, res) =>{
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>{
    res.send("this is user-Detail");
};

export const editProfile = (req, res) =>{
    res.send("this is edit-Profile");
};

export const changePassword = (req, res) =>{
    res.send("this is change-Password");
};




// Social Media Login Section
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async function(_, __, profile, cb) {
  console.log(profile);
  const {_json: { id, name, email} } = profile;
  try{
      const user = await User.findOne({email});
      if(user){
          user.githubId = id;
          user.save();
          return cb(null, user);
      }
          const newUser = await User.create({
              email,
              name,
              githubId: id
          });
          return cb(null, newUser);
      
  }catch(error){
      return cb(error);
  }

};


export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};


export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async function(_, __, profile, cb) {
  console.log(profile);
  const {_json : {id, properties:{nickname}, kakao_account:{email}}} = profile;
  try{
      const user = await User.findOne({});
      if(user){
        user.kakaoId = id;
        user.save();
        return cb(null, user);
      }
        const newUser = await User.create({
          email,
          name : nickname,
          kakaoId: id
        });
        return cb(null, newUser);
      
  }catch(error){
      return cb(error);
  }

};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};




// export const facebookLogin = passport.authenticate("facebook");

// export const facebookLoginCallback = async function(_, __, profile, cb) {
//   console.log(profile);
//   const {_json: { id, name, email} } = profile;
//   try{
//       const user = await User.findOne({email});
//       if(user){
//           user.githubId = id;
//           user.save();
//           return cb(null, user);
//       }
//           const newUser = await User.create({
//               email,
//               name,
//               githubId: id
//           });
//           return cb(null, newUser);
      
//   }catch(error){
//       return cb(error);
//   }

// };

// export const postFacebookLogin = (req, res) => {
//   res.redirect(routes.home);
// };