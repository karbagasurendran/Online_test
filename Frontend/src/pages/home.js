import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Pagination, InputGroup, Form } from 'react-bootstrap';
import {setstudentscore} from '../Api/actions';
import { toast } from "react-toastify";

var initquestion = {
    question1: { option1: false, option2: false, answered: false },
    question2: { option1: false, option2: false, answered: false },
    question3: { option1: false, option2: false, answered: false },
    question4: { option1: false, option2: false, answered: false },
    question5: { option1: false, option2: false, answered: false },
}
function Home() {
    const location = useLocation();
    const navigate = useNavigate()
    var {state} = location;
    console.log(location)
    const [Question, setQuestion] = useState(initquestion)
    const [Noq, setNoq] = useState(1)
    let [score, setscore] = useState(0);

    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} onClick={() => setNoq(number)} active={number === Noq}>
                {number}
            </Pagination.Item>,
        );
    }
    const handlequestion = ((e) => {
        console.log(e.target.checked, 'valid')
        let { name, checked, id } = e.target;
        switch (name) {
            case "question1":
                if (id === "inline-radio-1") {
                    let validate = {...Question[name],...{ option1: checked, option2: !checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                } else {
                    let validate = {...Question[name],...{ option1: !checked, option2: checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                }
                break;
            case "question2":
                if (id === "inline-radio-3") {
                    let validate = {...Question[name],...{ option1: checked, option2: !checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                } else {
                    let validate = {...Question[name],...{ option1: !checked, option2: checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                }
                break;
            case "question3":
                if (id === "inline-radio-5") {
                    let validate = {...Question[name],...{ option1: checked, option2: !checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                } else {
                    let validate = {...Question[name],...{ option1: !checked, option2: checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                }
                break;
            case "question4":
                if (id === "inline-radio-7") {
                    let validate = {...Question[name],...{ option1: checked, option2: !checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                } else {
                    let validate = {...Question[name],...{ option1: !checked, option2: checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                }
                break;
            case "question5":
                if (id === "inline-radio-9") {
                    let validate = {...Question[name],...{ option1: checked, option2: !checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                } else {
                    let validate = {...Question[name],...{ option1: !checked, option2: checked }}
                    let questiondata = { ...Question, ...{ [name]: validate } }
                    setQuestion(questiondata)
                }
                break;
        }
    })

    const handlesubmitquestion = (async (e) => {
        let { name } = e.target;
        console.log(!Question[name].option1 , !Question[name].option2)
        if(!Question[name].option1 && !Question[name].option2){
            toast.warning("please select one");
            return false;
        }
        if (Question[name].option1) {
            setscore(score + 1);
        }
        let validate = {...Question[name],...{ answered:true}}
        let questiondata = { ...Question, ...{ [name]: validate } }
        setQuestion(questiondata)
        let result =name.split("n");
        setNoq(parseInt(result[1])+1);
        if(name==="question5"){
            let data = {
                id: state._id,
                score: Question[name].option1?score+1:score,
                round:state.round+1,
                parentId: state.parentId,
                name: state.name,
                email: state.email
            };
            let {result,success} =await setstudentscore(data);
            if(success){
                navigate("/scroeboard",{ state: state});
            }
        }
    })

    console.log(state, "user");
    return (
        <>
            {Noq == 1 && <Card>
                <Card.Header>Question 1</Card.Header>
                <Card.Body>
                    <Card.Title>What is an A* algorithm search method</Card.Title>
                    <Card.Text>
                        A* is a computer algorithm that is extensively used for the purpose of finding the path or traversing a graph in order to find the most optimal route between various points called the nodes.
                    </Card.Text>

                    <Card.Title>
                        The above sentense is correct or wrong ?
                    </Card.Title>
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="correct"
                                name="question1"
                                checked={Question["question1"].option1}
                                type={"radio"}
                                onChange={handlequestion}
                                id={`inline-radio-1`}
                            />
                            <Form.Check
                                inline
                                label="Wrong"
                                name="question1"
                                checked={Question["question1"].option2}
                                type={"radio"}
                                onChange={handlequestion}
                                id={`inline-radio-2`}
                            />
                        </div>
                        <Button variant="primary" disabled={Question["question1"].answered} name="question1" onClick={handlesubmitquestion}>Next</Button>
                    </Form>
                </Card.Body>
            </Card>}
            {Noq == 2 && <Card>
                <Card.Header>Question 2</Card.Header>
                <Card.Body>
                    <Card.Title>Ethereum is Which type of blockchain</Card.Title>
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Public Blockchain"
                                name="question2"
                                checked={Question["question2"].option1}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-3`}
                            />
                            <Form.Check
                                inline
                                label="Private Blockchain"
                                name="question2"
                                checked={Question["question2"].option2}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-4`}
                            />
                        </div>
                    </Form>
                    <Button variant="primary" disabled={Question["question2"].answered} name="question2" onClick={handlesubmitquestion}>Next</Button>
                </Card.Body>
            </Card>}
            {Noq == 3 && <Card>
                <Card.Header>Question 3</Card.Header>
                <Card.Body>
                    <Card.Title>Which type of key used in blockchain</Card.Title>

                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Privatekey, Publickey"
                                name="question3"
                                checked={Question["question3"].option1}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-5`}
                            />
                            <Form.Check
                                inline
                                label="Primarykey, foreignkey"
                                name="question3"
                                checked={Question["question3"].option2}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-6`}
                            />
                        </div>
                    </Form>
                    <Button variant="primary" disabled={Question["question3"].answered} name="question3" onClick={handlesubmitquestion}>Next</Button>
                </Card.Body>
            </Card>}
            {Noq == 4 && <Card>
                <Card.Header>Question 4</Card.Header>
                <Card.Body>
                    <Card.Title>
                    Defi means
                    </Card.Title>
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Decentralized finance"
                                name="question4"
                                checked={Question["question4"].option1}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-7`}
                            />
                            <Form.Check
                                inline
                                label="Distributed finance"
                                name="question4"
                                type={"radio"}
                                checked={Question["question4"].option2}
                                onChange={handlequestion}
                                id={`inline-radio-8`}
                            />
                        </div>
                    </Form>
                    <Button variant="primary" disabled={Question["question4"].answered} name="question4" onClick={handlesubmitquestion}>Next</Button>
                </Card.Body>
            </Card>}
            {Noq == 5 && <Card>
                <Card.Header>Question 5</Card.Header>
                <Card.Body>
                    <Card.Title>What is a name india own cryptocurrency?</Card.Title>
                    <Form>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="CBDC"
                                name="question5"
                                checked={Question["question5"].option1}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-9`}
                            />
                            <Form.Check
                                inline
                                label="Matic"
                                name="question5"
                                checked={Question["question5"].option2}
                                onChange={handlequestion}
                                type={"radio"}
                                id={`inline-radio-10`}
                            />
                        </div>
                    </Form>
                    <Button variant="primary" disabled={Question["question5"].answered} name="question5" onClick={handlesubmitquestion}>Finish</Button>
                </Card.Body>
            </Card>}
            <div>
                <Pagination>{items}</Pagination>
                <br />
            </div>
        </>
    );
}

export default Home;