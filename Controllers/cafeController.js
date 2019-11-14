import routes from "../routes";
import Cafe from "../models/Cafes"


export const home = async (req, res) => {
    try {
        const cafes = await Cafe.find({});
        res.render("home", { pageTitle: "Home", cafes });
       // console.dir(cafes);
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
    //    console.log(cafe);
        res.render("cafeDetail", {pageTitle: "cafe Detail", cafe});
    }catch(error){
        res.redirect(routes.home);
    }
  
    // const cafeObj = await Cafe.find({"_id" : req.params.id });
    // const cafe = cafeObj[0];
    // res.render("cafeDetail", {pageTitle: "cafeDeatil", cafe});
}

export const reviewAdd = async (req, res) =>{
    console.log(req.body);
}

export const map = (req, res) =>{
    res.send("this is map");
}

export const search = async (req, res) =>{
    const {
        query: { term: searchingBy }
    } = req;
    const cafes = await Cafe.find({"name" : {$regex: searchingBy}});
    //console.log(cafes);
    res.render("search", {pageTitle: "search", searchingBy, cafes});
}

export const conditionalSearch = (req, res) =>{
    res.render("conditionalSearch",{pageTitle: "조건검색"});
}

export const postConditionalSearch = async (req, res) => {
   // Object.keys(req.body).forEach( (key, value) => {return req.body[key] = true;});
   // const cafes = await Cafe.find({$and:[req.body]}); 
    const cafes = await Cafe.find({'amenities.name' : {'$all' : Object.keys(req.body) }});
    console.log(Object.keys(req.body));
    //console.log(cafes);
    res.render("conditionalSearch",{pageTitle: "조건검색", cafes});
    
}


export const ameIndex = (req, res) =>{
    res.send("this is ame-Index");
}


// //test
export const cafeInsert = (req, res) => {
    const cafe = new Cafe();
    cafe.name = req.body.name;
    cafe.location = req.body.location;
    cafe.imageUrl = req.body.imageUrl;

    cafe.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});
    })
}

export const cafeDeleteAll = (req, res) => {
    const cafes = Cafe.find({});
    cafes.remove({}, function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
}

// export const cafeUpdate = (req, res) => {
// }