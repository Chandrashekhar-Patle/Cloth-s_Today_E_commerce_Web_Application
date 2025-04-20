import "./DescriptionBox.css"

function DescriptionBox() {
    
    return(
        <>
        <div className="DescriptionBox">
            <div className="navigator">
                <div className="nav-box">Description</div>
                <div className="nav-box fade">Reviews (122)</div>
            </div>

            <div className="description">
                <p>An e-commerce website is an online platform that facilitate buying 
                    and selling of products or services over the internet serves as a 
                    virtual marketplace where businesses and individual showcase their products,
                    interact with customers, and conduct transactions without the need 
                    for a physical presence. E - commerce websites have gained immense
                    popularity due to their convenitely accessiblity, and the global reach they offer.
                </p>

                <p>
                    E-commerce websites typically display products or services detailed
                    description, images, prices, and any available variants (e.g. sizes, colors).
                     Each product usually has its own dedication.
                </p>
            </div>
        </div>
        </>
    )
}

export default DescriptionBox;