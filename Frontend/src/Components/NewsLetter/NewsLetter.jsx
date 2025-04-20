import "./NewsLetter.css"

function NewsLetter() {
    return(
        <>
        <div className="newsletter">
            <h1>Get Exclusive Offer On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div className="subscribe-box">
                <input type="email" placeholder="Your Email id" />
                <button>Subscribe</button>
            </div>
        </div>
        </>
    )
}

export default NewsLetter;