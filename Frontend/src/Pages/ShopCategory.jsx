import { useContext, useMemo, useState } from "react";
import "./CSS/ShopCategory.css"
import { ShopContext } from "../Context/ShopContext";
import Items from "../Components/Items/Items";
import dropdown_icon from "../assets/dropdown.png";

function ShopCategory({ banner, category, searchTerm = "" }) {
    const { allProduct } = useContext(ShopContext);
    const [sortBy, setSortBy] = useState("featured");

    const filteredProducts = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();
        const list = allProduct.filter((item) => {
            const matchesCategory = item.category === category;
            if (!matchesCategory) return false;
            if (!normalized) return true;
            return item.name.toLowerCase().includes(normalized);
        });

        switch (sortBy) {
            case "low-high": return [...list].sort((a, b) => a.newPrice - b.newPrice);
            case "high-low": return [...list].sort((a, b) => b.newPrice - a.newPrice);
            default: return list;
        }
    }, [allProduct, category, searchTerm, sortBy]);

    return (
        <>
            <div className="shop-category">
                <img className="shopCategory-banner" src={banner} alt="Shop Category Banner" />
                <div className="shopCategory-indexesSort">
                    <p>
                        <span>Showing {filteredProducts.length}</span> {filteredProducts.length === 1 ? "product" : "products"}
                    </p>
                    <div className="shopCategory-sort">
                        <label>
                            Sort by
                            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                                <option value="featured">Featured</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                        </label>
                        <img className="dropdown-icon" src={dropdown_icon} alt="" />
                    </div>
                </div>

                <div className="shopCategory-products">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item, index) => (
                            <Items
                                key={index}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                newPrice={item.newPrice}
                                oldPrice={item.oldPrice}
                            />
                        ))
                    ) : (
                        <div className="shop-category-empty">
                            <h3>No items match your search.</h3>
                            <p>Try a different keyword to reveal more pieces in this luxury edit.</p>
                        </div>
                    )}
                </div>

                <div className="shopCategory-loadmore">
                    Explore more
                </div>
            </div>
        </>
    );
}

export default ShopCategory;