import routes from "../routes";
import Cafe from "../models/Cafes"

// //test
// export const cafeInsert = (req, res) => {
//     const cafe = new Cafe();
//     cafe.name = req.body.name;
//     cafe.location = req.body.location;
//     cafe.imageUrl = req.body.imageUrl;

//     cafe.save(function(err){
//         if(err){
//             console.error(err);
//             res.json({result: 0});
//             return;
//         }

//         res.json({result: 1});
//     })
// }

// export const cafeDeleteAll = (req, res) => {
//     const cafes = Cafe.find({});
//     cafes.remove({}, function(err){
//         if(err){
//             console.error(err);
//             res.json({result: 0});
//             return;
//         }
//         res.json({result: 1});
//     });
// }

// export const cafeUpdate = (req, res) => {
// }

export const home = async (req, res) => {
     try {
      const cafes = await Cafe.find({});
      res.render("home", { pageTitle: "Home", cafes });
      console.dir(cafes);
    } catch (error) {
      console.log(error);
      res.render("home", { pageTitle: "Home", cafes: [] });
    }
}


export const cafeDetail = async (req, res) =>{
    const cafeObj = await Cafe.find({"_id" : req.params.id });
    
    const cafe = cafeObj[0];
    res.render("cafeDetail", {pageTitle: "cafeDeatil", cafe});
}

export const review = (req, res) =>{
    res.send("this is review");
}

export const map = (req, res) =>{
    res.send("this is map");
}

export const search = async (req, res) =>{
    const {
        query: { term: searchingBy }
    } = req;
    const cafes = await Cafe.find({"name" : {$regex: searchingBy}});
    res.render("search", {pageTitle: "search", searchingBy, cafes});
}

export const conditionalSearch = (req, res) =>{
    res.render("conditionalSearch",{pageTitle: "조건검색"});
}

export const ameIndex = (req, res) =>{
    res.send("this is ame-Index");
}