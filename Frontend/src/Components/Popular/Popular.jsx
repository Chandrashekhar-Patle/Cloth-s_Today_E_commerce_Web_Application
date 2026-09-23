import data_product from "../../assets/Data";
import Items from "../Items/Items";
import "./popular.css";

function Popular({ searchTerm = "" }) {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const visibleItems = data_product.filter((item) => {
        if (!normalizedTerm) return true;
        return item.name.toLowerCase().includes(normalizedTerm);
    });
    
    return (
        <>
            <div className="Popular">
                <h1>Popular in Women</h1>
                <hr />
                <div className="popular-item">
                    {visibleItems.map((item, index) => {
                        return <Items key={index} id={item.id} name={item.name} image={item.image}
                            newPrice={item.newPrice} oldPrice={item.oldPrice} />
                    })}
                </div>
            </div>
        </>
    );
}

export default Popular;