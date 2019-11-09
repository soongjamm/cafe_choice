import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : "cafe name is required."
    },
    imageUrl : {
        type : String,
        required : "cafe image url is required."
    },
    location : {
        type : String,
        required : "cafe location is required."
    },

    
    parking : {
        type : Boolean,
       // required : "parking availability"
    },
    smoking : {
        type : Boolean,
      //  required : "smoking availability"
    },
    terrace : {
        type : Boolean,
     //   required : "terrace presence"
    },
    restroom : {
        type : Boolean,
     //   required : "restroom pressence"
    }

    //amenities : [String]


});

const model = mongoose.model("Cafe", cafeSchema);
export default model;