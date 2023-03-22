import axios from "axios";
import config from "./index"

axios.defaults.baseURL =config.BACKENDURL;

export default axios;


