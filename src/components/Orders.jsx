import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import axios from "axios";
function Orders() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/orders/${user.email}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      <div>
        {orders &&
          orders.map((order) => (
            <div key={order._id}>
              <h3>Order Id: {order.orderDate}</h3>
              <ul>
                {order.items.map((item) => (
                  <div key={item._id}>
                    <li>Name : {item.name}</li>
                    <li>Price : {item.price}</li>
                    <li>Quantity : {item.quantity}</li>
                    <li>Total : {item.price * item.quantity}</li>
                    <br />
                  </div>
                ))}
              </ul>
              <h3>Order Value: {order.orderValue}</h3>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}
export default Orders;