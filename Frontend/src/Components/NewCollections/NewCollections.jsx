import Items from "../Items/Items";
import "./NewCollections.css";
import new_collections from "../../assets/newCollections.js";

function NewCollections() {

    return (
        <>
            <div className="newCollection">
                <h1>New Collections</h1>
                 <hr />
                <div className="collections">
                    {new_collections.map((item, index) => {
                        return <Items key={index} id={item.id} name={item.name} image={item.image}
                            newPrice={item.newPrice} oldPrice={item.oldPrice} />
                    })}
                </div>
            </div>
        </>
    )
}

export default NewCollections;