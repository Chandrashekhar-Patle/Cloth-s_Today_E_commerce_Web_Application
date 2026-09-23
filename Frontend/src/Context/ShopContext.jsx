import { createContext, useState } from "react";
import allProduct from "../assets/all_products.js";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let i = 0; i <= allProduct.length; i++) {
       cart[i] = 0;    
    }
    return cart;
}

const ContextProvider = ({children})=>{
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const updateCartItem = (itemId, amount) => {
        setCartItems((prev)=> ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) + amount)
        }));
    }
          
    const addToCart = (itemId)=>{
        updateCartItem(itemId, 1);
    }

    const removeFromCart = (itemId)=>{
        updateCartItem(itemId, -1);
    }

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = allProduct.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.newPrice * cartItems[item];     
            }
        }
        return totalAmount;
    }

    const getTotalCartItem =()=>{
        let totalItem=0;
        for( const item in cartItems){
            if (cartItems[item]>0) {
                totalItem+= cartItems[item];
            }
        }

        return totalItem;
    }

    const contextValue = { getTotalCartAmount, allProduct, cartItems ,getTotalCartItem, addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ContextProvider;
