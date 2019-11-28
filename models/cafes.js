import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema({
    name : {
        type : String,
        required : "cafe name is required."
    },
    branch : {
        type : String
    },
    imageUrl : {
        type : String,
        required : "cafe image url is required."
    },
    location : {
        type : String,
        required : "cafe location is required."
    },
    latlng : {
        lat : {
            type: Number
        },
        lng : {
            type: Number
        }
    },

    menu :  [{ 
        category : String,
        subcat : [{
            name : {
                type: String
            },
            price : {
                type: String
            }
        }]  
    }],
    
    amenities : {
        type : [Object]
    }


});

const model = mongoose.model("Cafe", cafeSchema);
export default model;