import { Link } from "react-router-dom";
import "./Navbar.css"
import { useContext, useState } from "react";
import CartIcon from "../../assets/Cart_Icon.png";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
    const [menu, setMenu] = useState("shop")
    const {getTotalCartItem} = useContext(ShopContext);
    return(
        <>
        <div>
            <nav className="Navbar">
                <div className="logo">
                    <h1>Cloth's Today</h1>
                </div>
                <ul className="nav-Item">
                    <li onClick={()=> setMenu("shop")}><Link className="link" to="/">Shop </Link>{menu === "shop" ? <hr /> : <></>}</li>
                    <li onClick={()=> setMenu("mens")}><Link className="link" to="/men">Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                    <li onClick={()=> setMenu("womens")}><Link className="link" to="/women">Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                    <li onClick={()=> setMenu("kids")}><Link className="link" to="/kid">Kid</Link>{menu === "kids" ? <hr /> : <></>}</li>
                </ul>

                <div className="buttons">
                    <button><Link className="login" to="/login" >Login</Link></button>
                     <Link to="/cart"><img src={CartIcon} alt="" /></Link>
                     <div className="nav-cart-count">{getTotalCartItem()}</div>
                </div>

            </nav>
        </div>
        </>
    )
}

export default Navbar;