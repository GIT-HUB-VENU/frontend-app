import { useState, useEffect } from "react";
import "./Content.css";
import axios from "axios";
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
    const url = "https://backend-app-2-lfsh.onrender.com/store";
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
              <li><img src={`https://backend-app-2-lfsh.onrender.com/${product.image}`} alt={product.name} /></li>
              <li>Product : {product.name}</li>
              <li>Price : {product.price}</li>
              <li>Description : {product.desc}</li>
            </ul>
            <hr/>
          </div>
        ))}
    </div>
  );
}
export default Content;