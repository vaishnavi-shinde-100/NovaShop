import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async (text) => {
    setQuery(text);

    if (text.length === 0) {
      setResults([]);
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/products/search/${text}`,
    );

    setResults(res.data);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />

      {results.length > 0 && (
        <div className="search-results">
          {results.map((product) => (
            <div
              key={product._id}
              className="search-item"
              onClick={() => {
                navigate(`/product/${product._id}`);
                setResults([]); // hide dropdown
                setQuery(""); // clear search input
              }}
            >
              <div className="search-bar-list">
                <p>{product.name}</p>
                <img src={product.image} alt={product.name} />
                {/* <p>₹{product.price}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
