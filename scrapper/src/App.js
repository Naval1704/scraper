import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/logo.png";

function App() {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make a request to start the scraper with the search query
    try {
      const response = await axios.post(`${URL}/scrape`, { query });
      console.log("Scraper response:", response.data);
    } catch (error) {
      console.error("Error starting scraper:", error);
    }
  };
  return (
    <div className="App">
      <div className="upper-navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>
            " <span>Our automation helps you locate better, cheaper items</span>{" "}
            "
          </p>
        </div>
        <hr className="head-line" />
      </div>
      <div className="content">
        {/* For searching products */}
        <div className="search">
          <h2>Product Search Tool</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search">Search for a new item:</label>
            <input
              type="text"
              id="search"
              value={query}
              onChange={handleSubmit}
            />
            <button type="submit">Start Scraper</button>
          </form>
        </div>

        <div className="search-results">
          
        </div>
      </div>
    </div>
  );
}

export default App;
