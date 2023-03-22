import React, { useEffect } from "react";
import { useNavigate,redirect,Route } from "react-router-dom";



function ConditionRoute({children}) {
const navigate = useNavigate();
const type = localStorage.getItem('type');
const token = localStorage.getItem("admintoken")
useEffect(()=>{
    if(!token){
        navigate("/auth");
    }
})

return children;

}
export default ConditionRoute;
