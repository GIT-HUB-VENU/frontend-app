import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart.jsx";
import Orders from "./components/Orders.jsx";
import { BrowserRouter , Route ,Routes } from "react-router-dom"; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Content />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
      <Footer />


      <Register />

      <Cart />

      <Orders />

      <Footer />
    </div>
  );
}
export default App;