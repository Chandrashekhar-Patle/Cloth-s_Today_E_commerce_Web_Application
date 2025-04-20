import data_product from "../../assets/Data";
import Items from "../Items/Items";
import "./popular.css"



function Popular() {
    
    return (
        <>
            <div className="Popular">
                <h1>Popular in Women</h1>
                <hr />
                <div className="popular-item">
                    {data_product.map((item, index) => {
                        return <Items key={index} id={item.id} name={item.name} image={item.image}
                            newPrice={item.newPrice} oldPrice={item.oldPrice} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Popular;