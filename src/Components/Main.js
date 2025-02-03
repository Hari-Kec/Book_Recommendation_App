import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";

const Main = () => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Romance", "Comedy", "Horror", "Action", "Sci-Fi", "Fantasy", "Thriller"];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category); // Unselect category
      } else {
        return [...prev, category]; // Select category
      }
    });
  };

  const fetchBooksByCategory = () => {
    setLoading(true);
    const selected = selectedCategories.join("+");
    const apiKey = "AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU"; // Replace with your API key

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${selected}&key=${apiKey}&maxResults=40`
      )
      .then((res) => {
        setData(res.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching books:", err);
        setLoading(false);
      });
  };

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      setLoading(true);
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=40`
        )
        .then((res) => {
          setData(res.data.items);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="header">
        
        <div className="row2">
          
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchBook}
            />
            <button onClick={searchBook}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <img src="./images/bg2.png" alt="" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="category-selector">
        <h3>Select Categories</h3>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
        <button onClick={fetchBooksByCategory}>Submit</button>
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading books...</p>}

      {/* Display Books */}
      <div className="container">
        {bookData && bookData.length > 0 ? (
          <Card book={bookData} />
        ) : (
          !loading && <p>No books found for the selected categories or search.</p>
        )}
      </div>
    </>
  );
};

export default Main;
