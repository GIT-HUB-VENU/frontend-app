import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, createContext} from "react";
import { useNavigate } from "react-router-dom";
export const appContext = createContext();
function App() {
  const [user, setUser] = useState({});   
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  return (
    <div>
      <appContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Content />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
           <Route path="logout" element={<Logout />} />
          <Route path="register" element={<Register />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </appContext.Provider>
    </div>
  );
}
export default App;