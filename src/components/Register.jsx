function Register() {
    return (
        <div>
            <h1>Register Page</h1>
            <form>
                <input type="text" placeholder="Username" /><br />
                <input type="email" placeholder="Email" /><br />
                <input type="password" placeholder="Password" /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;