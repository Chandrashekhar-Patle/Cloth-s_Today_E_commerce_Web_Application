import Items from "../Items/Items";
import "./NewCollections.css";
import new_collections from "../../assets/newCollections.js";

function NewCollections({ searchTerm = "" }) {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const visibleCollections = new_collections.filter((item) => {
        if (!normalizedTerm) return true;
        return item.name.toLowerCase().includes(normalizedTerm);
    });

    return (
        <>
            <div className="newCollection">
                <h1>New Collections</h1>
                 <hr />
                <div className="collections">
                    {visibleCollections.map((item, index) => {
                        return <Items key={index} id={item.id} name={item.name} image={item.image}
                            newPrice={item.newPrice} oldPrice={item.oldPrice} />
                    })}
                </div>
            </div>
        </>
    )
}

export default NewCollections;