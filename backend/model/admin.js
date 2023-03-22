import mongoose, { Schema,model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/index";

const adminSchema = new Schema({
    name: { type: String, default:""},
    password:{type: String, default: ""},
    email:{type: String, default: ""},
    Address:{type: String, default: ""},
    createdAt:{type: Date, default: Date.now()},
})

adminSchema.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.SECRETORKEY);
    return `Bearer ${token}`;
};

const admin = model("admin",adminSchema,"admin");

export default admin;



