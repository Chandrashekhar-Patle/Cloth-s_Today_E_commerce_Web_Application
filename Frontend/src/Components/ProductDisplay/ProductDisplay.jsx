                    <div className="productDisplay-badge-row">
                        <span className="productDisplay-badge">Luxury capsule</span>
                        <span className="productDisplay-status">In stock</span>
                    </div>
import { useContext, useState } from "react";
import "./ProductDisplay.css"
import StarIcon from "../../assets/Star_Icon.avif";
import Star_DullIcon from "../../assets/Star_dull_icon.jpeg";
import { ShopContext } from "../../Context/ShopContext";

function ProductDisplay(props) {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState("M");

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

                    <div className="productDisplay-img" style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}>
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
                        <p className="newPrice">${product.newPrice}</p>
                        <p className="oldPrice">${product.oldPrice}</p>
                    </div>

                    <div className="description">
                        Crafted for elevated everyday dressing, this statement piece balances tailored precision with an effortless drape. Designed in premium fabric with refined detailing for all-day comfort and a polished silhouette.
                    </div>

                    <div className="cloth-Size">
                        <h1>Select Size</h1>
                        <div className="sizes">
                            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                <div
                                    key={size}
                                    className={selectedSize === size ? 'selected' : ''}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => addToCart(product.id)}>Add To Cart</button>
                    <p className="category"><span>Category :</span> {product.category}, Fashion, Trend</p>
                    <p className="category"><span>Selected Size :</span> {selectedSize}</p>
                </div>
            </div>
        </>
    )
}

export default ProductDisplay;