import Hero from "../Components/Hero/Hero";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import Offers from "../Components/Offers/Offers";
import Popular from "../Components/Popular/Popular";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Items from "../Components/Items/Items";

function Shop({ searchTerm = "" }) {
    const { allProduct } = useContext(ShopContext);

    const normalizedTerm = searchTerm.trim().toLowerCase();
    const filteredProducts = allProduct.filter((item) => {
        if (!normalizedTerm) return true;
        return (
            item.name.toLowerCase().includes(normalizedTerm) ||
            item.category.toLowerCase().includes(normalizedTerm)
        );
    });

    return(
        <>
        <div className="Shop_Section">
            <Hero />
            <Popular searchTerm={searchTerm} />
            <Offers />
            <NewCollections searchTerm={searchTerm} />

            <div className="search-results-panel">
                <div className="search-results-header">
                    <h2>{normalizedTerm ? "Search results" : "Curated luxury picks"}</h2>
                    <span>{filteredProducts.length} items</span>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="search-results-grid">
                        {filteredProducts.map((item) => (
                            <Items
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                newPrice={item.newPrice}
                                oldPrice={item.oldPrice}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-search-state">
                        <p>No products match your search. Try a different style, category, or keyword.</p>
                    </div>
                )}
            </div>
            <NewsLetter />
        </div>
            
        </>
    )
}

export default Shop;