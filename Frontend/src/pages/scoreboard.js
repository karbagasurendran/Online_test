
import React,{useEffect, useState} from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import {toast} from "react-toastify"
import {claimRewards,getstudentscroe} from "../Api/actions";
import { Button,Spinner } from "react-bootstrap";
import badgelogo  from "../assets/badge.png";
import Web3 from "web3";
import config from "../config/index";
import isEmpty from "is-empty";


function Scoreboard(props) {
const navigate = useNavigate();
const location = useLocation();
var { state} = location;
let [score,setscore] = useState(0)
let [round,setround] = useState(0)
let [txhash,settxhash] = useState();
let [loading,setloading] = useState();
let [details,setdetails] = useState();


 useEffect(()=>{
  console.log(state,"statue")
  getscroe();
 },[])

 const getscroe=(async()=>{
  let reqdata = {studentId: state._id,round: state.round +1}
  let {result,success} = await getstudentscroe(reqdata);
  console.log(result,'the result');
  if(success){
    setdetails(result)
    setscore(result.score)
    setround(result.round)
  }

 })

  const   handlesubmit =(async(e)=>{
    e.preventDefault()
    if(window.ethereum){
try{
     var address = await window.ethereum.request({ method: 'eth_requestAccounts' });
     console.log(address,"address");
     setloading(true)
     let reqdata = {address: address[0], amount: 1,id:details._id};
      let {message,result,success} = await claimRewards(reqdata);
      if(success){
        toast.success("Rewards claimed successfully");
        settxhash(result.txid);
        setloading(false)
      }else{
        toast.error("Rewards claimed failed")
        setloading(false)
      }
     }catch(err){
      setloading(false);
      toast.error("Please connect metamask to this site");
     }

    }else{
      toast.warning("please install metamask extension")
      window.open("https://metamask.io/download/","_blank")
      return false;
    }
  })

  const Logout =(()=>{
    localStorage.removeItem("authtoken");
    localStorage.removeItem("type");
    navigate("/auth");
  })
  console.log(state,"state")
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Score Board</h3>
          <div className="form-group mt-3">
            {round&&<h5>Round {round}</h5>}
            <label>Your Score is :</label>
          </div>
          <div className="row">
            <div className="col-sm"><img src={badgelogo}  height="45"/></div>
            <div className="col-sm">{score&&<h1>{score}</h1>}</div>
          </div>
          {isEmpty(txhash)&&details&&!details.rewards&&<div>
         { score>=5 ?<div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handlesubmit}>
           {loading && <Spinner animation="border" size="sm" />} Claim
            </button>
          </div>:<p className="forgot-password text-right mt-2">
          Best regards try next time ...
          </p>}
          </div>}
          {txhash&&<p className="forgot-password text-right mt-2">
          <a href={`${config.Txurl}${txhash}`} target="_blank">View Transaction</a>
          </p>}
          <div className="mt-3"><Button onClick={Logout}>Logout</Button></div>
          
        </div>
      </form>
    </div>
  )
}

export default Scoreboard; 