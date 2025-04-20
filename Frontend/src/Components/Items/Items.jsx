import { Link } from "react-router-dom";
import "./Items.css"

function Items(props) {
    
    
    return (
        <>
            <div className="Items">
                <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="Product Image" /></Link>
                <p>{props.name}</p>

                <div className="items-prices">
                    <div className="new-price">
                        ${props.newPrice}
                    </div>

                    <div className="old-price">
                        ${props.oldPrice}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Items;