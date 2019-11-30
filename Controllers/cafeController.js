import routes from "../routes";
import Cafe from "../models/cafes";
import Comment from "../models/comments";
import jsStringify from "js-stringify";

// 추천카페 
export const home = async (req, res) => {
    try {
        // 추천카페 임의로 선정
        const cafes = await Cafe.find({ 'amenities.name' : "plug", 'amenities.name' : "wifi", 'menu.subcat.0.price' : {$lt: 2500}}) ;
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
        let cafe;
        await Cafe.findById(id).populate({
            path : 'comments',
            populate : { path: 'creator', select: 'name'}
        }).exec((err, data) => { 
            cafe=data;
            console.log(cafe);
            res.render("cafeDetail", {pageTitle: "cafe Detail", jsStringify, cafe});
        });
        



    }catch(error){
        console.log(error);
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
    const cafes = await Cafe.find({ $or: [{"name" : {$regex: searchingBy}}, {'menu.subcat.name' : {$regex: searchingBy}}]});
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
    const cafes = await Cafe.find({});//.sort({"menu.0.subcat.0":1});
    // 아메리카노 가격순으로 정렬
    cafes.sort(function (a, b) {
        return a.menu[0].subcat[0].price - b.menu[0].subcat[0].price;
    });
    
    // 아메지수 계산
    let ameindex=0;
    
    cafes.forEach(function(item){
        ameindex+=parseInt(item.menu[0].subcat[0].price);
        // console.log(item.menu[0].subcat[0]price, ameindex);
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

// 리뷰 등록

export const getAddComment = async(req,res) => {
    res.redirect(routes.cafeDetail((req.headers.referer).split('/')[4]));
}

//내용,작성자id, 카페id
export const postAddComment = async(req, res) => {
    // console.log((req.headers.referer).split('/')[4], req.user.id);
    const { 
        headers : {referer},
        body : { review : comment},
        user
    } = req;
    const id = referer.split('/')[4];
    console.log(user.id);
    try{
        const cafe = await Cafe.findById(id);
        console.log("hi");
        const newComment = await Comment.create({
            text : comment,
            creator : user.id 
        })
        console.log("hi");

        cafe.comments.push(newComment.id);
        cafe.save();
    }catch(error){
        res.status(400);
    }finally{
        res.redirect(routes.cafeDetail((req.headers.referer).split('/')[4]));

        res.end();
    }
}

// 리뷰 삭제
export const getDeleteComment = (req, res) => {
    res.redirect(routes.cafeDetail((req.headers.referer).split('/')[4]));
}

export const postDeleteComment = (req, res) => {
    console.log("여기다", req);
    // const { 
    //     headers : {referer},
    //     body : { review : comment},
    //     user
    // } = req;
    // const id = referer.split('/')[4];
    // console.log(user.id);
    // try{
    //     const cafe = await Cafe.findById(id);
    //     console.log("hi");
    //     const newComment = await Comment.create({
    //         text : comment,
    //         creator : user.id 
    //     })
    //     console.log("hi");

    //     cafe.comments.push(newComment.id);
    //     cafe.save();
    // }catch(error){
    //     res.status(400);
    // }finally{
    //     res.redirect(routes.cafeDetail((req.headers.referer).split('/')[4]));

    //     res.end();
    // }
}
