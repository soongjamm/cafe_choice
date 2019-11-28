import routes from "../routes";
import Cafe from "../models/Cafes";
import jsStringify from "js-stringify";

// 추천카페 
export const home = async (req, res) => {
    try {
        // 추천카페 임의로 선정
        const cafes = await Cafe.find({ 'amenities.name' : "plug", 'amenities.name' : "wifi", 'menu.0.price' : {$lt: 2500}}) ;
        res.render("home", { pageTitle: "Home", jsStringify, cafes });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", cafes: [] });
    }
}


export const cafeDetail = async (req, res) =>{
    const { 
        params : {id}
    }=req;

    try{
        const cafe = await Cafe.findById(id);
        res.render("cafeDetail", {pageTitle: "cafe Detail", jsStringify, cafe});
    }catch(error){
        res.redirect(routes.home);
    }
  
}

export const map = (req, res) =>{
    
    res.send("this is map");
}

export const search = async (req, res) =>{
    const {
        query: { term: searchingBy }
    } = req;
    const cafes = await Cafe.find({ $or: [{"name" : {$regex: searchingBy}}, {'menu.name' : {$regex: searchingBy}}]});
    // const cafes = await Cafe.find({"name" : {$regex: searchingBy}});
    res.render("search", {pageTitle: "search", searchingBy, cafes});
}

export const conditionalSearch = (req, res) =>{
    res.render("conditionalSearch",{pageTitle: "조건검색"});
}


export const postConditionalSearch = async (req, res) => {
    const selection = Object.keys(req.body);
    // 조건 만족하는 카페 검색
    const cafes = await Cafe.find({'amenities.name' : {'$all' : Object.keys(req.body) }});
    
    // 선택된 조건의 한글명 배열에 저장
    let sel2 = undefined;
    if(cafes != ""){
        sel2 = selection.map( x => {var tmp = cafes[0].amenities.filter(y => 
            { if(y.name == x){
                console.log(y.amen, x);
                return Object.values(y.amen);
            }
        } )
        return tmp[0].amen;}
        );
    }
    res.render("conditionalSearch",{pageTitle: "조건검색", cafes, sel2});
    
}


export const ameIndex = async(req, res) =>{
    const cafes = await Cafe.find({}).sort({menu:1});
    
    // 아메리카노 가격순으로 정렬
    cafes.sort(function (a, b) {
        return a.menu[0].price - b.menu[0].price;
    });
    
    // 아메지수 계산
    let ameindex=0;
    
    cafes.forEach(function(item){
        ameindex+=parseInt(item.menu[0].price);
        console.log(item.menu[0].price, ameindex);
    });
    ameindex = Math.floor(ameindex/=cafes.length);
    
    res.render("ameIndex", {pageTitle: "아메지수", cafes, ameindex});
}


// 전체카페 나열
export const listAll = async (req, res) => {
    try {
        const cafes = await Cafe.find({});
        res.render("listAll", { pageTitle: "카페 전체보기", jsStringify, cafes });
    } catch (error) {
        console.log(error);
        res.render("listAll", { pageTitle: "카페 전체보기", cafes: [] });
    }
}
