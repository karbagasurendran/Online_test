
import React ,{useEffect, useState}from "react"
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap"
import {gettrainnerlist,registerTrainer} from "../Api/actions"
import {toast} from  'react-toastify';
import NavBar from "./navbar";

function AddTrainer(props) {
  var navigate = useNavigate();
  let [trainerList, settrinerList] = useState([]);
  let [registerdata,setregisterdata] = useState({});


const list=(async()=>{
  let {result,success} =await gettrainnerlist();
  if(success){
    settrinerList(result);
  }
})

useEffect(()=>{
  list()

  },[])


  const handlechange=((e)=>{
    console.log(e.target.value,'event')
    let {value} = e.target;
    let formdata = {...registerdata,...{['parentId']:value}};
    setregisterdata(formdata);
  })

  const setdata =((e)=>{
    let {value,name} = e.target;
    let formdata = {...registerdata,...{[name]:value}};
    setregisterdata(formdata);
  })

  const handlesubmit =(async(e)=>{
    e.preventDefault()
    console.log(registerdata,"resiterdata")
    let {success,result} = await registerTrainer(registerdata);
    if(success){
      toast.success("register successfully");
      navigate("/trainerlist");
    }else{
      toast.error("register failed")
    }
  })

  return (
    <>
    <NavBar />
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Add Trainer</h3>
          <div className="form-group mt-3">
            <label>Select Refered Trainer</label>
            <Form.Select aria-label="Default select example" onChange={handlechange}>
            <option>Choose trainer</option>
             {trainerList.length>0&&trainerList.map((data,key)=>{
              return(
              <option key={key} value={data._id}>{data.name}</option>
              )
             })}
            </Form.Select>
          </div>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={setdata}
              className="form-control mt-1"
              placeholder="Enter name"  
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              onChange={setdata}
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={setdata}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmpassowrd"
              onChange={setdata}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" onClick={handlesubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  )
}

export default AddTrainer; 