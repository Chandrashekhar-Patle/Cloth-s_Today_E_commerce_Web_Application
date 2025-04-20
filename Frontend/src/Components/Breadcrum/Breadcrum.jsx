import "./Breadcrum.css"
import Right_Arrow from "../../assets/Right_arrow.png";

function Breadcrum(props) {
    const {product} = props;
    return(
        <>
        <div className="Breadcrum">
            HOME <img src={Right_Arrow} alt="" /> SHOP <img src={Right_Arrow} alt="" /> {product.category} <img src={Right_Arrow} alt="" /> {product.name} 
            
        </div>
        </>
    )
}

export default Breadcrum;