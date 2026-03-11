import "./Header.css"
function Header(){
    return (
    <div className="App-Header">
      <h1>Header</h1>
      <nav>
        <ul>
            <li>Home</li>
            <li>Carts</li>
            <li>Orders</li>
            <li>login</li>
            <li>logout</li>
        </ul>
      </nav>
    </div>
    )
}
export default Header;