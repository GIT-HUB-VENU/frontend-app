import { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);

  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      // Get userId from localStorage or context
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("You must be logged in to place an order.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/orders/place`,
        { products, user: userId },
        { withCredentials: true } // include cookies if using session auth
      );

      console.log("Order placed:", response.data);
      alert("Order placed successfully!");
      setCart([]); // clear cart
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h1>My Cart</h1>
      <ol>
        {cart.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price} - 
            <button onClick={() => decrement(item._id)}>-</button>
            {item.quantity}
            <button onClick={() => increment(item._id)}>+</button> -
            ${item.quantity * item.price}
          </li>
        ))}
      </ol>
      <p>
        <strong>Order Value: ${orderValue}</strong>
      </p>
      <p>
        <button onClick={placeOrder}>Place Order</button>
      </p>
    </div>
  );
}

export default Cart;