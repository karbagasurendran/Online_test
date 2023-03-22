import { user } from "../model";
import * as db from "../config/dbcontroller";
import bcrypt from 'bcrypt';
import config from '../config/index';
import transferToken from "../helper/transfer"

export const studentlogin = (async (req, res) => {
    try {
        let reqBody = req.body;

        let checkStudent = await db.AsyncfindOne("user",{ "email": reqBody.email ,role:"student"},{});
        if (!checkStudent) {
        return res.status(200).json({ 'success': false, 'errors': {"email":"Email Id not found"},result:"" }); 
        }
        let status = await bcrypt.compare(reqBody.password, checkStudent.password)
        if(!status){
            return res.status(200).json({ 'success': false, 'errors': {"password":"Password is wrong"},result:"" }); 
        }
        let payloadData = {
            "_id": checkStudent._id
        }
        let token = await db.Logintoken("user",payloadData);
        return res.status(200).json({ 'success': true, 'result': checkStudent,"token": token });
    } catch (err) {
        return res.status(400).json({ 'success': false, 'errors': err });
    }
})

export const trainerlogin = (async (req, res) => {
    try {
        let reqBody = req.body;

        let chcekTrainer = await db.AsyncfindOne("user",{ "email": reqBody.email ,role:"trainer"},{});
        if (!chcekTrainer) {
        return res.status(200).json({ 'success': false, 'errors': {"email":"Email Id not found"},result:"" }); 
        }
        let status = await bcrypt.compare(reqBody.password, chcekTrainer.password)
        if(!status){
            return res.status(200).json({ 'success': false, 'errors': {"password":"Password is wrong"},result:"" }); 
        }
        let payloadData = {
            "_id": chcekTrainer._id
        }
        let token = await db.Logintoken("user",payloadData);
        return res.status(200).json({ 'success': true,'message':"Login Successfully", 'result':chcekTrainer, "token": token });
    } catch (err) {
        return res.status(400).json({ 'success': false,'message':"Login Failed", 'errors': err });
    }
})

export const gettrainerlist = (async (req, res) => {
    try {
        let reqBody = req.body;
        let query = {role: "trainer"}
        let trainerList = await db.AsyncFind("user",query,{});
        return res.status(200).json({ 'success': true, 'result': trainerList });
    } catch (err) {
        return res.status(400).json({ 'success': false, 'errors': err, 'result': [] });
    }
})

export const registerstudent =(async (req,res)=>{
    try{
    console.log(req.body,"reqbody");
    let Reqbody = req.body;
    let hash = await bcrypt.hash(Reqbody.password, config.SALTROUND);
    let data = {parentId: Reqbody.parentId,name: Reqbody.name,email: Reqbody.email,password:hash,role:'student'}
    let student = await db.AsyncInsert("user",data);
    return res.status(200).json({ 'success': true, 'message': "register successfully" });
    }catch(err){
        console.log(err,'err')
        return res.status(400).json({ 'success': false, 'errors': err, 'message': "resgiter failed" });
    }
})


export const setstudentscore = (async (req, res) => {
    try {
        let reqBody = req.body;
        let update = {round: reqBody.round};
        let student = await db.AsyncfindOneAndUpdate("user",{_id:reqBody.id},update,{new: true});
        let create = {
            studentId:reqBody.id,
            parentId:reqBody.parentId,
            name: reqBody.name,
            email: reqBody.email,
            round: reqBody.round,
            score: reqBody.score}
            console.log(create);
        let data = await db.AsyncInsert("testrounds",create);
        return res.status(200).json({ 'success': true, 'message': "scroe updated successfully" });
    } catch (err) {
        console.log(err,"error")
        return res.status(400).json({ 'success': false, 'errors': err, 'result': [] });
    }
})


export const claimRewards = (async (req, res) => {
    try {
        let reqBody = req.body;
        console.log(reqBody,"reqbody")
        let transaction = await transferToken(reqBody.amount,reqBody.address);
        let update = {rewards:true }
        let rewardsupdate = await db.AsyncfindOneAndUpdate("testrounds",{_id:reqBody.id},update,{new:true});
        console.log(rewardsupdate,'updatee')
        return res.status(200).json({ 'success': true, 'message': "Rewards transfered successfully",result: transaction });
    } catch (err) {
        console.log(err,"err")
        return res.status(400).json({ 'success': false, 'errors': err, 'message': "Rewards transfered failed", 'result': "" });
    }
})

export const getscore = (async (req, res) => {
    try {
        let reqBody = req.body;
        let query = {studentId:req.body.studentId,round: reqBody.round};
        let details = await db.AsyncfindOne("testrounds",query);
        return res.status(200).json({ 'success': true, 'message': "Get score successfully",result: details });
    } catch (err) {
        return res.status(400).json({ 'success': false, 'errors': err, 'message': "Get score failed", 'result': "" });
    }
})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let data =Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    return parseInt(data);
  }
  

  export const getstudenthistory = (async (req, res) => {
    try {
        let reqBody = req.body;
        console.log(reqBody,"reqbody")
        let query = {parentId:reqBody.parentId}
        let studentdetails = await db.AsyncFind("testrounds",query,{});
        return res.status(200).json({ 'success': true, 'result': studentdetails });
    } catch (err) {
        return res.status(400).json({ 'success': false, 'errors': err, 'result': [] });
    }
})


export const sample =(async (req,res)=>{
    console.log(req.body,"reqbody");
})