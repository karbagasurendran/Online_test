import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home";
import Scoreboard from './pages/scoreboard';
import Studenthistory from './pages/studenthistory';
import ConditionRoute from './Conditionroute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/register" element={<Register/> } />
      <Route path="/" element={ <Auth/> } />
      <Route path="/auth" element={ <Auth/> } />
      <Route path="/home" element={ <ConditionRoute ><Home /></ConditionRoute>}/>
      <Route path= "/scroeboard" element={<ConditionRoute ><Scoreboard/></ConditionRoute>}/>
      <Route path= "/student-history" element={<ConditionRoute ><Studenthistory/></ConditionRoute>}/>
      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;
