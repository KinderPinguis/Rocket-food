import mongoose from "mongoose";

const category = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

const categoryModel = mongoose.model('category', category, "categories");

export default categoryModel;