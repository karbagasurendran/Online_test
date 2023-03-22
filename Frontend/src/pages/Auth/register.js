
import React ,{useEffect, useState}from "react"
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap"
import {gettrainnerlist,registerStudent} from "../../Api/actions"
import {toast} from  'react-toastify';
import {registervalidation} from "../validation/register-validation"

function Register(props) {
  var navigate = useNavigate();
  let [trainerList, settrinerList] = useState([]);
  let [registerdata,setregisterdata] = useState({});
  let [validation,setvalidation] = useState({});



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
    setvalidation({})
    let valid = await registervalidation(registerdata)
    if(!valid.status){
      setvalidation(valid.errors);
      return false;
    }
    console.log(registerdata,"resiterdata")
    let {success,result} = await registerStudent(registerdata);
    if(success){
      toast.success("register successfully");
      navigate("/auth");
    }else{
      toast.error("register failed")
    }
  })

  const handleback =(()=>{
    navigate("/auth")
  })

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="form-group mt-3">
            <label>Select Trainer</label>
            <Form.Select aria-label="Default select example" onChange={handlechange}>
            <option>Choose trainer</option>
             {trainerList.length>0&&trainerList.map((data,key)=>{
              return(
              <option key={key} value={data._id}>{data.name}</option>
              )
             })}
            </Form.Select>
          </div>
          {validation.parentId&&<span className="validate">{validation.parentId}</span>}
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
          {validation.name&&<span className="validate">{validation.name}</span>}
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
          {validation.email&&<span className="validate">{validation.email}</span>}
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
          {validation.password&&<span className="validate">{validation.password}</span>}
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
          {validation.confirmpassowrd&&<span className="validate">{validation.confirmpassowrd}</span>}
          <div className="gap-2 mt-4 row">
            <button onClick={handleback} type="submit" className="btn btn-primary col-sm">
              cancel
            </button>
            <button type="submit" onClick={handlesubmit} className="btn btn-primary col-sm">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register; 