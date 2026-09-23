
import { NavLink } from "react-router-dom";
import "./CSS/loginSignup.css"


function Login() {

    return(
        <>
        <div className="login-signin">
            <div className="loginsignup-container">
                <h1>Login</h1>
                <div className="loginsignup-fields">
                    <input type="email" placeholder="Email Address"/>
                    <input type="password" placeholder="Password"/>
                </div>


                <button>Login</button>
                <p className="loginsignup-login">Don't have an account?<NavLink to="/signup">Sign Up</NavLink></p>
            </div>
        </div>
        </>
    )
}

export default Login;