import mongoose from "mongoose"

const reviewSchema = new Schema({
    content : {
        type : String,
        required : "review content is required."
    }
})
const model = mongoose.model("Review", reviewSchema);
export default model;