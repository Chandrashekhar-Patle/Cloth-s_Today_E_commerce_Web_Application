import { NavLink, useNavigate } from "react-router-dom";
import "./CSS/loginSignup.css";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL
).replace(/\/$/, "");

const initialValue = {
    email: "",
    password: ""
};

function Login() {
    const [loginData, setLoginData] = useState(initialValue);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(ShopContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed. Check your email and password.");
            }

            if (!data.user || typeof data.token !== "string" || !data.token) {
                throw new Error("The login response did not include a user and token.");
            }

            login(data.user, data.token);
            navigate("/", { replace: true });
        } catch (error) {
            setErrorMessage(error.message || "Unable to log in. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="login-signin">
                <form
                    className="loginsignup-container"
                    onSubmit={handleSubmit}
                >
                    <h1>Login</h1>

                    <div className="loginsignup-fields">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="loginsignup-error" role="alert">
                            {errorMessage}
                        </p>
                    )}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    <p className="loginsignup-login">
                        Don't have an account?
                        <NavLink to="/signup">Sign Up</NavLink>
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;