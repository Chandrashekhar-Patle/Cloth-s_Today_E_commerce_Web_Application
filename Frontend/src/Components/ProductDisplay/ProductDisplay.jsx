import "./ProductDisplay.css"
import StarIcon from "../../assets/Star_Icon.avif";
import Star_DullIcon from "../../assets/Star_dull_icon.jpeg";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

function ProductDisplay(props) {
    const { product } = props;
    const {addToCart} = useContext(ShopContext);
    
    return (
        <>
            <div className="productDisplay">
                <div className="productDisplay-left">
                    <div className="productDisplay-imgList">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>

                    <div className="productDisplay-img">
                        <img className="productDisplay-main-img" src={product.image} alt="" />
                    </div>
                </div>

                <div className="rightSide">
                    <h1>{product.name}</h1>
                    <div className="productDisplay-right-star">
                        <img src={StarIcon} alt="" />
                        <img src={StarIcon} alt="" />
                        <img src={StarIcon} alt="" />
                        <img src={StarIcon} alt="" />
                        <img src={Star_DullIcon} alt="" />
                        <p>(122)</p>
                    </div>

                    <div className="prices">
                        <p className="newPrice">{product.newPrice}</p>
                        <p className="oldPrice">{product.oldPrice}</p>
                    </div>

                    <div className="description">
                        A lightweight, usually knitted, pullover shirt, close fitting, 
                        and with a round neck line short sleeves, worn as an undershirt or outer garment.
                    </div>

                    <div className="cloth-Size">
                        <h1>Select Size</h1>
                        <div className="sizes">
                            <div>S</div>
                            <div>M</div>
                            <div>L</div>
                            <div>XL</div>
                            <div>XXL</div>
                        </div>
                    </div>

                    <button onClick={()=> {addToCart(product.id)}}>Add To Cart</button>
                    <p className="category"><span>Category :</span>Women, T-Shirt, Crop Top</p>
                    <p className="category"><span>Tags</span>Modern, Latest</p>
                </div>
            </div>
        </>
    )
}

export default ProductDisplay;