import { useContext } from "react";
import "./CSS/ShopCategory.css"
import { ShopContext } from "../Context/ShopContext";
import Items from "../Components/Items/Items";
import dropdown_icon from "../assets/dropdown.png";

function ShopCategory({banner, category}) {
    const {allProduct} = useContext(ShopContext);
    return(
        <>
        <div className="shop-category">
            <img className="shopCategory-banner" src={banner} alt="Shop Category Banner" />
            <div className="shopCategory-indexesSort">
                <p>
                    <span>Showing 1-12</span> out of 36 Products
                </p>
                <div className="shopCategory-sort">
                    Sort by <img className="dropdown-icon" src={dropdown_icon} alt="" />
                </div>
            </div>

            <div className="shopCategory-products">
                {allProduct.map((item, index)=>{
                    if (category === item.category) {
                        
                        return <Items key={index} id={item.id} name={item.name} image={item.image}
                            newPrice={item.newPrice} oldPrice={item.oldPrice} />
                    }
                    else{
                        return null;
                    }
                })}
            </div>

            <div className="shopCategory-loadmore">
                Explore more
            </div>
        </div>
        </>
    )
}

export default ShopCategory;