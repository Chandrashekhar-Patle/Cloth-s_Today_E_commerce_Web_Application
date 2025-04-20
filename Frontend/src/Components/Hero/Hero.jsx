import "./Hero.css";
import HeroImage from "../../assets/hero-images.jpg";

function Hero() {
    
    return(
        <>
        <div className="first">
            <div className="left-side">
                <p>Latest arrival only</p>
                <h1> New <span>Treading </span>  Style  here</h1>
                <button>More Collections</button>
            </div>

            <div className="right-side">
                <img src={HeroImage} alt="Hero Section image"  width="600px" height="400px"/>
            </div>
        </div>
        </>
    )
}

export default Hero;