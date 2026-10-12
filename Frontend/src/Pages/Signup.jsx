import { useState } from "react";
import "./CSS/loginSignup.css";
import { NavLink, useNavigate } from "react-router-dom";

const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL
).replace(/\/$/, "");

const initialValue = {
    name: "",
    email: "",
    password: ""
}

function LoginSignup() {
    const [registerData, setRegisterData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setRegisterData((prev)=>{
            return {
                ...prev,
                [name] : value,
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/register`,{
                method: "POST",
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData)
            });

            const data = response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed. Check your email and password.");
            }
            navigate("/login");
        } catch (error) {
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className="login-signup">
                <form className="loginsignup-container" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="loginsignup-fields">
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            value={registerData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={registerData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={registerData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <div className="loginsignup-agree">
                        <input type="checkbox" name="" id="" />
                        <p>By Continuing, I agree with terms of use and privacy policy.</p>
                    </div>

                    <button>Continue</button>
                    <p className="loginsignup-login">Already have an account?<NavLink to="/login">Login</NavLink></p>
                </form>
            </div>
        </>
    )
}

export default LoginSignup;