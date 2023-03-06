import ListingBlurb from "./ListingBlurb";
import ShopBlurb from "./ShopBlurb";

const SearchResults = ({ results }) => {
  return (
    <main id="search-results">
      <h2>Search results</h2>
      <div className="search-results-grid">
        {results.map((item, i) => {
          return item.type === "listing" ? (
            <ListingBlurb key={i} listing={item} />
          ) : (
            <ShopBlurb key={i} shop={item} />
          );
        })}
      </div>
    </main>
  );
};

export default SearchResults 