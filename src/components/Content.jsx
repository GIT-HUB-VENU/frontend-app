import { useState, useEffect, useContext } from "react";
import "./Content.css";
import axios from "axios";
import { AppContext } from "../App";

const API_URL = import.meta.env.VITE_API_URL;

function Content() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  const { cart, setCart } = useContext(AppContext);   // ⭐ FIX

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const fetchProducts = async () => {
    const url = `${API_URL}/store`;
    const res = await axios.get(url);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);

    if (!found) {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  };

  return (
    <div>
      <h3>Products Page</h3>

      {products.map((product) => (
        <div className="products" key={product._id}>
          <ul>
            <img src={`${API_URL}/${product.image}`} alt={product.name} />
            <li>Product : {product.name}</li>
            <li>Price : {product.price}</li>
            <li>Description : {product.desc}</li>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Content;