
import React,{useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import {StudentLogin} from "../../Api/actions";
import {loginvalidation} from "../validation/login-validation"
import isEmpty from "is-empty";
const initdata ={"email":"","password": ""}
function Login(props) {
const navigate = useNavigate();
let [logindata,setlogindata] = useState(initdata)
let [validation,setvalidation] = useState(initdata);

  const handlechange=((e)=>{
    console.log(e.target.value,'event')
    let {name,value} = e.target;
    let formdata = {...logindata,...{[name]:value}};
    setlogindata(formdata);
  })

  const   handlesubmit =(async(e)=>{
    e.preventDefault()
    console.log(logindata,"resiterdata")
    setvalidation({})
    let valid = await loginvalidation(logindata)
    console.log(valid);
    if(!valid.status){
      setvalidation(valid.errors);
      return false;
    }
    var {success,result,token,errors} = await StudentLogin(logindata);
    if(success){
      toast.success("Login successfully");
      localStorage.setItem('authtoken',token);
      localStorage.setItem('role',"student");
      // let errordata = {...validation,...errors}
      setvalidation(errors)
      navigate("/home",{
          state:result
        }
      );
    }else{
      console.log(errors,"error")
      // let formdata={...validation,...errors}
      setvalidation(errors)
      toast.error("Login failed")
    }
  })
  console.log(validation,"validation")
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Student Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              onChange={handlechange}
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
              onChange={handlechange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          {validation.password&&<span className="validate">{validation.password}</span>}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handlesubmit}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Don't have a account <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login; 