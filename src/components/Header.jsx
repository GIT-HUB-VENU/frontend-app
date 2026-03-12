import "./Header.css"
import { Link } from "react-router-dom";
function Header(){
    return (
    <div className="App-Header">
      <h1>My Store</h1>
      <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Carts</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/logout">logout</Link></li>
        </ul>
      </nav>
    </div>
    )
}
export default Header;