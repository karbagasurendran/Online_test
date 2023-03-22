import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Table, Button } from 'react-bootstrap';
import { getstudenthistory } from '../Api/actions'


function Studenthistory() {
  const navigate = useNavigate();
  const location = useLocation();
  var { state } = location;
  const [studentList, setstudentList] = useState([])
console.log(state,"the state")

  const list = (async () => {
    let reqdata={parentId:state._id }
    let { result, success } = await getstudenthistory(reqdata);
    if (success) {
      setstudentList(result);
    }
  })

  useEffect(() => {
    list()

  }, [])

  const handleadd = (() => {
    navigate("/add-trainer");
  })

  const Logout=(()=>{
    localStorage.removeItem("authtoken")
    localStorage.removeItem("type")
    navigate('/auth')
  })

  console.log(studentList, "trainerlist")
  return (
    <>
      <div><h1>Students Test History</h1></div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end"><Button onClick={Logout}>Logout</Button></div>
      <div style={{ marginTop: 30 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Round</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {studentList.length > 0 ? studentList.map((data, key) => {
              return (<tr>
                <td>{key + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.round}</td>
                <td>{data.score}</td>
              </tr>)
            }):<tr>No Records found</tr>}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Studenthistory;