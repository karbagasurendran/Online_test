import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Tree from "./pages/tree";
import Auth from "./pages/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css"
import TrainerList from './pages/trainerlist';
import AddTrainer from './pages/addtrainer';
import ConditionRoute from './Conditionroute';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/home" element={<ConditionRoute><Tree/></ConditionRoute>  } />
      <Route path="/" element={<Auth/> } />
      <Route path="/auth" element={ <Auth/> } />
      <Route path="/trainerlist" element={ <ConditionRoute><TrainerList/></ConditionRoute> } />
      <Route path="/add-trainer" element={ <ConditionRoute><AddTrainer/></ConditionRoute> } />
      </Routes>
      <ToastContainer />

    </div>
  );
}

export default App;
