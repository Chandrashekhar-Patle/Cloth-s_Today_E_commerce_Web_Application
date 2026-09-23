import { Link } from "react-router-dom";
import "./Items.css";

function Items(props) {
    return (
        <Link to={`/product/${props.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div
                className="Items"
                style={{
                    backgroundImage: `url(${props.image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    objectFit: "cover"
                }}
            >
                <div className="product-Details">
                    <span className="product-tag">Premium</span>
                    <p>{props.name}</p>
                    <div className="items-prices">
                        <div className="new-price">${props.newPrice}</div>
                        <div className="old-price">${props.oldPrice}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Items;