import isEmpty from "is-empty";
var emailregex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;


export const registervalidation = async (data) => {
    let errors = {}, reqBody = data;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;

    if (isEmpty(reqBody.email)) {
        errors.email = "Email Required";
    } else if (!(emailRegex.test(reqBody.email))) {
        errors.email = "Invalid Email";
    }
    if (isEmpty(reqBody.name)) {
        errors.name= "Name Required";
    }
    if (isEmpty(reqBody.parentId)) {
        errors.parentId= "Please select one";
    }
    if (isEmpty(reqBody.password)) {
        errors.password = "Password Required";
    }
    if (isEmpty(reqBody.confirmpassowrd)) {
        errors.confirmpassowrd = "Confirm Passowrd Required";
    }else if(reqBody.password !== reqBody.confirmpassowrd){
        errors.confirmpassowrd = "password didn't Match";
    }

    if (!isEmpty(errors)) {
        return {'status':false,'errors':errors}
    }else{
        return {'status':true,'errors':''}
    }
  };