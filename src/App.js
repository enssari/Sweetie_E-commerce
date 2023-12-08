import { CreateAcc } from "./pages/CreateAcc";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Login } from "./pages/Login";

function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>        
        <Route path="/register" element={<div><CreateAcc /></div>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<div><Navbar/><Header/><Hero/></div>} />
      </Routes>
      <Footer/>
      </div>
    </BrowserRouter>  
  );
}

export default App;