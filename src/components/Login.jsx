function Login() {
    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email" /><br />
                <input type="password" placeholder="Password" /><br />
                <button type="submit">Login</button>
            </form>
            <p><Link to="/register">New User? Register here</Link></p>
        </div>
    );
}

export default Login;