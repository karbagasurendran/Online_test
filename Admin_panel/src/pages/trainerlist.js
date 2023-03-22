import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {Table,Button} from 'react-bootstrap';
import NavBar from './navbar';
import {gettrainnerlist} from '../Api/actions'


function TrainerList() {
    const navigate= useNavigate();
    const [trinerList,settrinerList] = useState([])


    const list=(async()=>{
        let {result,success} =await gettrainnerlist();
        if(success){
          settrinerList(result);
        }
      })
      
      useEffect(()=>{
        list()
      
        },[])

    const handleadd =(()=>{
        navigate("/add-trainer");
    })

    console.log(trinerList,"trainerlist")
  return (
    <>
    <NavBar />
    <div style={{marginTop:10,alignItems:"end"}}><Button onClick={handleadd}> Add Trainer</Button></div>
    
    <div style={{marginTop:30}}>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
    {trinerList.length>0&&trinerList.map((data,key)=>{
        return(<tr>
          <td>{key+1}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.role}</td>
        </tr>)})}
      </tbody>
    </Table>
    </div>
    </>
  );
}

export default TrainerList;