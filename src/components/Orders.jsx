import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`, {
          withCredentials: true, // send session cookie
        });
        console.log("Orders response:", response.data);
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response && error.response.status === 401) {
          alert("You must be logged in to view orders.");
        }
        setOrders([]);
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
          const products = Array.isArray(order.products) ? order.products : [];
          const total = products.reduce(
            (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
            0
          );

          return (
            <div
              key={order._id}
              style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
            >
              <h3>Order ID: {order._id}</h3>
              <p>
                <strong>Date:</strong>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "Unknown"}
              </p>
              <p>
                <strong>Total:</strong> ${total}
              </p>
              <ul>
                {products.map((item) => (
                  <li key={item._id}>
                    {item.productId?.name || "Unknown Product"} - $
                    {item.productId?.price || 0} x {item.quantity} = $
                    {(item.productId?.price || 0) * item.quantity}
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