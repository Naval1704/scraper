import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/logo.png";

import SearchTextList from "./components/SearchTextList";
import TrackedProductList from "./components/TrackedProductList";
import PriceHistoryTable from "./components/PriceHistoryTable";

const URL = "http://localhost:5000";

function App() {
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [priceHistory, setPriceHistory] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);
  const [newSearchText, setNewSearchText] = useState("");

  useEffect(() => {
    fetchUniqueSearchTexts();
  }, []);

  const fetchUniqueSearchTexts = async () => {
    try {
      const response = await axios.get(`${URL}/unique_search_texts`);
      const data = response.data;
      setSearchTexts(data);
    } catch (error) {
      console.error("Error fetching unique search texts:", error);
    }
  };

  const handleSearchTextClick = async (searchText) => {
    try {
      const response = await axios.get(
        `${URL}/results?search_text=${searchText}`
      );

      const data = response.data;
      setPriceHistory(data);
      setShowPriceHistory(true);
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  const handlePriceHistoryClose = () => {
    setShowPriceHistory(false);
    setPriceHistory([]);
  };

  const handleNewSearchTextChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNewSearchTextSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${URL}/start-scraper`, {
        search_text: newSearchText,
        url: "https://amazon.ca",
      });

      alert("Scraper started successfully");
      setSearchTexts([...searchTexts, newSearchText]);
      setNewSearchText("");
    } catch (error) {
      alert("Error starting scraper:", error);
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
          <form onSubmit={handleNewSearchTextSubmit}>
            <label htmlFor="search">Search for a new item:</label>
            <input
              type="text"
              id="search"
              value={newSearchText}
              onChange={handleNewSearchTextChange}
            />
            <button type="submit">Start Scraper</button>
          </form>
        </div>

        <div className="search-results">
          <div className="search-list">
            <SearchTextList
              searchTexts={searchTexts}
              onSearchTextClick={handleSearchTextClick}
            />
          </div>
          <div className="tracked-products">
            <TrackedProductList />
          </div>
          <div className="price-history">
            {showPriceHistory && (
              <PriceHistoryTable
                priceHistory={priceHistory}
                onClose={handlePriceHistoryClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
