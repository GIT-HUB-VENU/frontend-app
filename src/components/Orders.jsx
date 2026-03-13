// frontend/components/Orders.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => {
          const total = order.products.reduce(
            (sum, item) => sum + item.productId.price * item.quantity,
            0
          );

          return (
            <div
              key={order._id}
              style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
            >
              <h3>Order ID: {order._id}</h3>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> ${total}</p>
              <ul>
                {order.products.map((item) => (
                  <li key={item._id}>
                    {item.productId.name} - ${item.productId.price} x {item.quantity} = $
                    {item.productId.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;