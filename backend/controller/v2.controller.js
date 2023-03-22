import { user } from "../model";
import * as db from "../config/dbcontroller";
import bcrypt from 'bcrypt';
import config from '../config/index';
import transferToken from "../helper/transfer"

export const adminlogin = (async (req, res) => {
    try {
        let reqBody = req.body;

        let checkadmin = await db.AsyncfindOne("admin",{ "email": reqBody.email },{});
        if (!checkadmin) {
        return res.status(200).json({ 'success': false, 'errors': {"email":"Invalid Email Id"},result:"" }); 
        }
        let status = await bcrypt.compare(reqBody.password, checkadmin.password)
        if(!status){
            return res.status(200).json({ 'success': false, 'errors': {"password":"Password is wrong"},result:"" }); 
        }
        let payloadData = {
            "_id": checkadmin._id
        }
        let token = await db.Logintoken("admin",payloadData);
        return res.status(200).json({ 'success': true, 'result': checkadmin,"token": token });
    } catch (err) {
        console.log(err,"error")
        return res.status(400).json({ 'success': false, 'errors': err });
    }
})

export const trainerlogin = (async (req, res) => {
    try {
        let reqBody = req.body;

        let checkUser = await db.AsyncfindOne("trainer",{ "email": reqBody.email },{});
        if (!checkUser) {
            let create = { email: reqBody.email };
            checkUser = await db.AsyncInsert('trainer', create);
        }
        let payloadData = {
            "_id": checkUser._id
        }
        let token = await db.Logintoken("trainer",payloadData);
        return res.status(200).json({ 'success': true,'message':"Login Successfully", 'result': token });
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

export const registerTrainer =(async (req,res)=>{
    try{
    console.log(req.body,"reqbody");
    let Reqbody = req.body;
    let hash = await bcrypt.hash(Reqbody.password, config.SALTROUND);
    let data = {parentId: Reqbody.parentId,name: Reqbody.name,email: Reqbody.email,password:hash,role:"trainer"}
    let trainer = await db.AsyncInsert("user",data);
    return res.status(200).json({ 'success': true, 'message': "register successfully" });
    }catch(err){
        return res.status(400).json({ 'success': false, 'errors': err, 'message': "resgiter failed" });
    }
})


export const setstudentscore = (async (req, res) => {
    try {
        let reqBody = req.body;
        let update = {round: reqBody.round};
        let student = await db.AsyncfindOneAndUpdate("student",{_id:reqBody.id},update,{new: true});
        let create = {
            studentId:reqBody.studentId,
            trnId:reqBody.trnId,
            round: reqBody.round,
            score: reqBody.score}
            console.log(create);
        let data = await db.AsyncInsert("testrounds",create);
        return res.status(200).json({ 'success': true, 'message': "scroe updated successfully" });
    } catch (err) {
        return res.status(400).json({ 'success': false, 'errors': err, 'result': [] });
    }
})


export const claimRewards = (async (req, res) => {
    try {
        let reqBody = req.body;
        let transaction = await transferToken(reqBody.amount,reqBody.address);
        return res.status(200).json({ 'success': true, 'message': "Rewards transfered successfully",result: transaction });
    } catch (err) {
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

export const gettree = (async (req, res) => {
    try {
        let reqBody = req.body;
        let project ={_id:1,name: 1,parentId: 1,role: 1}
        let treedetails = await db.AsyncFind("user",{},project);
        var elements = JSON.stringify(treedetails);
        elements = JSON.parse(elements);
        // let elements=[];
        
          const nodes = [];
          
          const createNode = (elm) => {
            const node = {
              _id: elm._id,
              name: elm.name,
              attributes: {"role":elm.role},
              children: [],
              parentId: elm.parentId
            };
            return node;
          };
          
          const fillElements = (elements, node) => {
            elements.forEach(elm => {
              if (elm.parentId === node._id) {
                const child = node.children.find(
                  (child) => child._id === elm._id
                );
          
                if (!child) {
                  node.children.push(createNode(elm));
                }
              }
            });
          };
          
          const fillTree = (elements, node) => {
            fillElements(elements, node);
          
            if (node.children.length > 0) {
              node.children.forEach(n => {
                fillElements(elements, n);
          
                fillTree(elements, n);
              });
            }
          };
          
          elements.forEach(elm => {
            if (!elm.parentId) {
              const root = createNode(elm);
              fillTree(elements, root);
              nodes.push(root);
            }
          });
          console.log(JSON.stringify(nodes,"nodes"))
        
        return res.status(200).json({ 'success': true, 'message': "Get score successfully",result: nodes });
    } catch (err) {
        return res.status(400).json({ 'success': false, 'errors': err, 'message': "Get score failed", 'result': [] });
    }
})


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let data =Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    return parseInt(data);
  }
  


export const sample =(async (req,res)=>{
    console.log(req.body,"reqbody");
})