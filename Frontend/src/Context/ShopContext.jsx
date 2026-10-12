import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/products";

export const ShopContext = createContext(null);

const AUTH_STORAGE_KEY = "cloths-today-auth";
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api"
).replace(/\/$/, "");

function getStoredAuth() {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return { token: null, user: null };
  }

  try {
    const auth = JSON.parse(storedAuth);
    if (typeof auth.token === "string" && auth.user) {
      return { token: auth.token, user: auth.user };
    }
  } catch (error) {
    console.error("Could not restore the saved login session:", error);
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  return { token: null, user: null };
}

const ContextProvider = ({ children }) => {
  const [allProduct, setAllProduct] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [auth, setAuth] = useState(getStoredAuth);

  const login = (user, token) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
    setAuth({ user, token });
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Logout request failed (${response.status}).`);
      }
    } finally {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setAuth({ user: null, token: null });
    }
  };

  useEffect(() => {
    let cancelled = false;

    fetchProducts()
      .then((products) => {
        if (!cancelled) setAllProduct(products);
      })
      .catch((error) => {
        if (!cancelled) setProductsError(error.message);
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateCartItem = (itemId, amount) => {
    setCartItems((previous) => ({
      ...previous,
      [itemId]: Math.max(0, (previous[itemId] || 0) + amount),
    }));
  };

  const addToCart = (itemId) => updateCartItem(itemId, 1);
  const removeFromCart = (itemId) => updateCartItem(itemId, -1);

  const getTotalCartAmount = () =>
    Object.entries(cartItems).reduce((total, [id, quantity]) => {
      const product = allProduct.find((item) => item.id === Number(id));
      return total + (product ? product.newPrice * quantity : 0);
    }, 0);

  const getTotalCartItem = () =>
    Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

  const contextValue = {
    allProduct,
    productsLoading,
    productsError,
    cartItems,
    user: auth.user,
    token: auth.token,
    login,
    logout,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

export default ContextProvider;