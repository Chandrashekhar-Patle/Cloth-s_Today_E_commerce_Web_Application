import { useContext } from "react"
import "./CartItems.css"
import { ShopContext } from "../../Context/ShopContext"
import Cross_Icon from "../../assets/Cross_Icon.png";

function CartItems() {

    const { getTotalCartAmount, allProduct, cartItems, addToCart, removeFromCart } = useContext(ShopContext);    
    
    return (
        <>
            <div className="cartItems">
                <div className="format-main">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {allProduct.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                        <div key={e.id}>
                            <div className="format-main cartItems-format" >
                                <img src={e.image} alt="" className="product-icon" />
                                <p>{e.name}</p>
                                <p>${e.newPrice}</p>
                                <div className="quantity-wrap">
                                    <button className="quantity-button" onClick={() => removeFromCart(e.id)}>-</button>
                                    <button className="quantity">{cartItems[e.id]}</button>
                                    <button className="quantity-button" onClick={() => addToCart(e.id)}>+</button>
                                </div>
                                <p>${e.newPrice * cartItems[e.id]}</p>
                                <button className="remove-button" onClick={() => removeFromCart(e.id)}>
                                    <img src={Cross_Icon} alt="Remove cross icon" className="removeIcon"/>
                                </button>
                            </div>
                            <hr />
                        </div>
                )}
                    return null;
                })}

                <div className="cartItems-down">
                    <div className="cartItems-total">
                        <h1>Cart Totals</h1>
                        <div>
                            <div className="cartItems-total-item">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <div className="cartItems-total-item">
                                <p>Shipping fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className="cartItems-total-item total-amount">
                                <h3>Total</h3>
                                <h3>${getTotalCartAmount()}</h3>
                            </div>
                        </div>
                        <button>Proceed TO CHECKOUT</button>
                    </div>

                    <div className="Promocode">
                        <p>If you have a promo code, Enter it here</p>
                        <div className="promo-box">
                            <input type="text" placeholder="promo code"/>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CartItems;