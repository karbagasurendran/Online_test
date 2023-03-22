import mongoose, { Schema,model } from "mongoose";
import { Jwt } from "jsonwebtoken";
import config from "../config/index";

const testroundsSchema = new Schema({
    studentId: {type: Schema.Types.ObjectId, default: 0},
    parentId: {type: Schema.Types.ObjectId,default:0},
    name: {type: String, default: ""},
    email: {type: String, default: ""},
    round: { type: Number, default:0},
    score:{type: Number, default: 0},
    rewards:{type: Boolean, default: false},
    createdAt:{type: Date, default: Date.now()},
})


const testrounds = model("testrounds",testroundsSchema,"testrounds");

export default testrounds;



