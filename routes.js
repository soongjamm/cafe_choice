//Global Router
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const CONDITIONAL_SEARCH = "/conditional-search";
const AME_INDEX = "/ame-index";

//User Router
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Cafe Router
const CAFES = "/cafes";
const CAFE_DETAIL = "/:id";
const MAP = "/map";
const REVIEW = "/review";


//routes object
const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    conditionalSearch : CONDITIONAL_SEARCH,
    ameIndex : AME_INDEX,
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
    review : REVIEW
}

export default routes;
