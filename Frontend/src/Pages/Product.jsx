import { useContext } from "react";
import "./CSS/Product.css"
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProduct from "../Components/RelatedProduct/RelatedProduct";

function Product() {
    const {allProduct} = useContext(ShopContext);
    const {productId} = useParams();
    const product = allProduct.find((e)=> e.id === Number(productId))

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found.</h2>
                <p>Please return to the shop and choose a valid product.</p>
            </div>
        );
    }
    
    return(
        <>
        <div className="product">
            <Breadcrum product= {product} />
            <ProductDisplay product= {product} />
            <DescriptionBox />
            <RelatedProduct />
        </div>
        </>
    )
}

export default Product;