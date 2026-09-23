import { Link } from "react-router-dom";
import "./Navbar.css"
import { useContext, useState } from "react";
import CartIcon from "../../assets/Cart_Icon.png";
import { ShopContext } from "../../Context/ShopContext";

function Navbar({ searchTerm, setSearchTerm }) {
    const [menu, setMenu] = useState("shop");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getTotalCartItem } = useContext(ShopContext);

    const navItems = [
        { label: "Shop", path: "/", key: "shop" },
        { label: "Men", path: "/men", key: "mens" },
        { label: "Women", path: "/women", key: "womens" },
        { label: "Kid", path: "/kid", key: "kids" }
    ];

    const handleNavClick = (key) => {
        setMenu(key);
        setIsMenuOpen(false);
    };

    return (
        <>
        <div>
            <nav className="Navbar">
                <div className="logo">
                    <h1>Cloth's Today</h1>
                </div>

                <div className="search">
                    <input
                        type="search"
                        name=""
                        id="searchInputBox"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search luxury pieces..."
                    />
                    <button type="button" className="searchButton" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Search</button>
                </div>

                <button
                    className="mobile-menu-toggle"
                    aria-label="Toggle navigation"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    ☰
                </button>

                <ul className={`nav-Item ${isMenuOpen ? "open" : ""}`}>
                    {navItems.map((item) => (
                        <li key={item.key} onClick={() => handleNavClick(item.key)}>
                            <Link className="link" to={item.path}>{item.label}</Link>
                            {menu === item.key ? <hr /> : <></>}
                        </li>
                    ))}
                </ul>

                <div className="buttons">
                    <button><Link className="login" to="/login">Login</Link></button>
                    <Link to="/cart" className="cart-icon-wrap">
                        <img src={CartIcon} alt="Cart" />
                    </Link>
                    <div className="nav-cart-count">{getTotalCartItem()}</div>
                </div>
            </nav>
        </div>
        </>
    )
}

export default Navbar;