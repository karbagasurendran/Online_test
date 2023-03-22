import axios from "axios";
import config from "./index"

axios.defaults.baseURL =config.BACKENDURL;
if(localStorage.getItem("authtoken")){
    axios.defaults.headers["authtoken"]=localStorage.getItem("authtoken")
}

export default axios;


