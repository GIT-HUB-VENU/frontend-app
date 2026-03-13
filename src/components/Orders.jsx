import { useState, useEffect } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`);
        console.log("Orders response:", response.data);
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div>
      <h1>My Orders</h1>
      {safeOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        safeOrders.map((order) => {
          const products = Array.isArray(order.products) ? order.products : [];
          const total = products.reduce(
            (sum, item) => sum + ((item.productId?.price || 0) * item.quantity),
            0
          );

          return (
            <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>Order ID: {order._id}</h3>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> ${total}</p>
              <ul>
                {products.map((item) => (
                  <li key={item._id}>
                    {item.productId?.name || "Unknown Product"} - ${item.productId?.price || 0} x {item.quantity} = ${(item.productId?.price || 0) * item.quantity}
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