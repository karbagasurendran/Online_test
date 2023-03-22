import mongoose, { Schema,model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/index";

const userSchema = new Schema({
    parentId: {type: Schema.Types.ObjectId, default: 0},
    round: {type: Number,default:0},
    name: { type: String, default:""},
    email: { type: String, default:""},
    password:{type: String, default: ""},
    address:{type: String, default: ""},
    role:{type: String, default: ""},
    createdAt:{type: Date, default: Date.now()},
})

userSchema.methods.generateJWT =  async function (payload) {
    var token =  await jwt.sign(payload, config.SECRETORKEY);
    console.log(token,"token")
    return `Bearer ${token}`;
};

const user = model("user",userSchema,"user");

export default user;



