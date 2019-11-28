//Global Router
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const CONDITIONAL_SEARCH = "/conditional-search";
const AME_INDEX = "/ame-index";
const LIST_ALL = "/list-all";

//User Router
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Cafe Router
const CAFES = "/cafes";
const CAFE_DETAIL = "/:id";
const MAP = "/map";
const REVIEW_ADD = "/review-add";

// Social login
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";


//routes object
const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    conditionalSearch : CONDITIONAL_SEARCH,
    ameIndex : AME_INDEX,
    listAll : LIST_ALL,
    users : USERS,
    userDetail : id => {
        if(id){
            return `/users/${id}`;
        }else{
            return USER_DETAIL;
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    cafes : CAFES,
    cafeDetail : id => {
        if(id){
            return `/cafes/${id}`;
        }else{
            return CAFE_DETAIL;
        }
    },
    map : MAP,
    reviewAdd : id => {
        if(id){
            return `/cafes${REVIEW_ADD}`;
        }else{
            return REVIEW_ADD;
        }
    },
    github : GITHUB,
    githubCallback : GITHUB_CALLBACK,
    kakao : KAKAO,
    kakaoCallback : KAKAO_CALLBACK,
    // facebook : FB,
    // facebookCallback : FB_CALLBACK
}

export default routes;
