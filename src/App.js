import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from './pages/Login';
import Logout from './pages/Logout';
import LoginOTP from './pages/LoginOTP';
import Register from './pages/Register';
import RegisterOTP from './pages/RegisterOTP';
import SelectPath from './pages/SelectPath';
import DashboardStudent from './pages/DashboardStudent';
import AllComponents from './pages/Example';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<DashboardStudent />} />
            <Route path="Login" element={<Login />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="LoginOTP" element={<LoginOTP />} />
            <Route path="Register" element={<Register />} />
            <Route path="RegisterOTP" element={<RegisterOTP />} />
            <Route path="SelectPath" element={<SelectPath />} />
            <Route path="AllComponents" element={<AllComponents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
