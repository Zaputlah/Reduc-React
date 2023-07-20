import React, { useState } from 'react';
import '../css/Login.css'; // Impor file CSS untuk gaya tampilan
import 'bootstrap/dist/css/bootstrap.min.css'; // Impor CSS Bootstrap
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika login Anda di sini
        if (username === "admin" && password === "admin") {
            // Login berhasil
            setError("");
            navigate("/dashboard");
            // Lakukan hal setelah login berhasil di sini (misalnya, mengatur token otentikasi)
        } else {
            // Kredensial tidak valid
            setError("Kredensial tidak valid.");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukkan username Anda"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password Anda"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
        </div>
    );
}

export default Login;
