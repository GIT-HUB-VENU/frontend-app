import { useState, useEffect } from "react";
import "./Content.css";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function Content() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
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
  return (
    <div>
      <h3>Products Page</h3>
      <button onClick={decrement}>-</button>
      {count}
      <button onClick={increment}>+</button>
      <hr />
      
        {products.map((product) => (
          <div className="products">
            <ul>
              <img src={`${API_URL}/${product.image}`} alt={product.name} />
              <li>Product : {product.name}</li>
              <li>Price : {product.price}</li>
              <li>Description : {product.desc}</li>
              <button>Add to Cart</button>
            </ul>
          </div>
        ))}
    </div>
  );
}
export default Content;