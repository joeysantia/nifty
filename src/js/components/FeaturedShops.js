import ShopBlurb from "./ShopBlurb"

const FeaturedShops = ({ shops }) => {

    return (
        <div className="featured-shops">
            {shops.map((shop, i) => {
                return <ShopBlurb shop={shop} key={i}/>
            })}
        </div>
    )
}

export default FeaturedShops