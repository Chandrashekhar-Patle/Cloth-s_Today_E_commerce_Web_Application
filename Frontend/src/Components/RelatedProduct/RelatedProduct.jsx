import "./RelatedProduct.css"
import Data_Product from "../../assets/Data";
import Items from "../Items/Items.jsx";

function RelatedProduct() {
    
    return(
    <>
    <div className="relatedProduct">
        <h1>Related Products</h1>
        <hr />
        <div className="productItems">
            {Data_Product.map((item, index)=> {
                return <Items key={index} id={item.id} name={item.name} image={item.image}
                newPrice={item.newPrice} oldPrice={item.oldPrice} />
            })}
        </div>
    </div>
    </>
    )
}

export default RelatedProduct;