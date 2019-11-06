import { cafes }  from "../db";


export const home = (req, res) =>{
    res.render("home", {pageTitle: "home", cafes});
}

export const cafeDetail = (req, res) =>{
    res.render("cafeDetail", {pageTitle: "cafeDeatil"});
}

export const review = (req, res) =>{
    res.send("this is review");
}

export const map = (req, res) =>{
    res.send("this is map");
}

export const search = (req, res) =>{
    const {
        query: { term: searchingBy }
    } = req;
    res.render("search", {pageTitle: "search", searchingBy});
}

export const conditionalSearch = (req, res) =>{
    res.render("conditionalSearch",{pageTitle: "조건검색"});
}

export const ameIndex = (req, res) =>{
    res.send("this is ame-Index");
}