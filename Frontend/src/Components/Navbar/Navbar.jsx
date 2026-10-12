import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"
import { useContext, useEffect, useRef, useState } from "react";
import CartIcon from "../../assets/Cart_Icon.png";
import { ShopContext } from "../../Context/ShopContext";

function Navbar({ searchTerm, setSearchTerm }) {
    const [menu, setMenu] = useState("shop");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logoutError, setLogoutError] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef(null);
    const { getTotalCartItem, user, logout } = useContext(ShopContext);
    const navigate = useNavigate();
    const nameParts = user?.name?.trim().split(/\s+/).filter(Boolean) ?? [];
    const userInitials = nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        : (nameParts[0]?.[0] ?? "U").toUpperCase();

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

    const handleLogout = async () => {
        setIsAccountMenuOpen(false);
        setLogoutError("");
        setIsLoggingOut(true);

        try {
            await logout();
        } catch (error) {
            console.error("Logout request failed:", error);
            setLogoutError(
                "You have been signed out on this device, but the server could not revoke your token.",
            );
        } finally {
            setIsLoggingOut(false);
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        if (!isAccountMenuOpen) return undefined;

        const handlePointerDown = (event) => {
            if (!accountMenuRef.current?.contains(event.target)) {
                setIsAccountMenuOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsAccountMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAccountMenuOpen]);

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
                    {!user && (
                        <button><Link className="login" to="/login">Login</Link></button>
                    )}
                    <div className="cart-control">
                        <Link to="/cart" className="cart-icon-wrap" aria-label="Cart">
                            <img src={CartIcon} alt="" />
                        </Link>
                        <div className="nav-cart-count">{getTotalCartItem()}</div>
                    </div>
                    {user && (
                        <div className="account-control" ref={accountMenuRef}>
                            <button
                                type="button"
                                className="account-avatar"
                                aria-label="Open account menu"
                                aria-haspopup="menu"
                                aria-expanded={isAccountMenuOpen}
                                onClick={() => setIsAccountMenuOpen((open) => !open)}
                                disabled={isLoggingOut}
                            >
                                {userInitials}
                            </button>
                            {isAccountMenuOpen && (
                                <div className="account-menu" role="menu">
                                    <div className="account-menu-user">
                                        <strong>{user.name}</strong>
                                        {user.email && <span>{user.email}</span>}
                                    </div>
                                    <Link
                                        to="/profile"
                                        role="menuitem"
                                        onClick={() => setIsAccountMenuOpen(false)}
                                    >
                                        About me
                                    </Link>
                                    <Link
                                        to="/orders"
                                        role="menuitem"
                                        onClick={() => setIsAccountMenuOpen(false)}
                                    >
                                        My orders
                                    </Link>
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={handleLogout}
                                        disabled={isLoggingOut}
                                    >
                                        {isLoggingOut ? "Logging out..." : "Logout"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {logoutError && <p className="logout-error" role="status">{logoutError}</p>}
            </nav>
        </div>
        </>
    )
}

export default Navbar;