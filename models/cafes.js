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

    menu : {
        type : [Object]
    },
    
    amenities : {
        type : [Object]
    }

    //amenities : [String]


});

const model = mongoose.model("Cafe", cafeSchema);
export default model;