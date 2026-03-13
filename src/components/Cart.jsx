import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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
    if (!user?.email) return navigate("/login", { state: { fromCart: true } });

    const order = {
      email: user.email,
      items: cart,
      orderValue: orderValue,
      orderDate: Date.now(),
    };

    try {
      await axios.post(`${API_URL}/orders`, order);
      setCart([]);
      navigate("/orders");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order!");
    }
  };

  return (
    <div>
      <h1>My Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ol>
          {cart.map((item) => (
            <li key={item._id}>
              {item.name} - {item.price} -{" "}
              <button onClick={() => decrement(item._id)}>-</button>{" "}
              {item.quantity}{" "}
              <button onClick={() => increment(item._id)}>+</button> -{" "}
              {item.quantity * item.price}
            </li>
          ))}
        </ol>
      )}
      <p>
        <strong>Order Value: {orderValue}</strong>
      </p>
      <p>
        <button onClick={placeOrder}>
          {user?.email ? "Place Order" : "Login to Order"}
        </button>
      </p>
    </div>
  );
}

export default Cart;