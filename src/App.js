import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import Tranding from "./pages/Tranding";
import Appbar from "./components/Appbar";

function App() {
  return (
    <>
     <div className="w-full h-full flex flex-col first-letter:content-center items-center relative text-white font-nunito"> 
      <div className="w-screen h-screen bg-gray-300 fixed -z-10"/>
     <BrowserRouter>
     <Appbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Saved" element={<Saved/>} />
          <Route path="/Tranding" element={<Tranding/>} />
        </Routes>
      </BrowserRouter>
     </div>
    </>
  );
}

export default App;
