import mongoose from "mongoose";

const kitchenSchema=mongoose.Schema({
    name: String,
    description:String,
    image:String,
    location:String,
    rating:Number


})
const kitchen=mongoose.model("kitchen",kitchenSchema);

export default kitchen;