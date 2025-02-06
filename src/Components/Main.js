import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import Groq from "groq-sdk";
import './styles.css';

// Initialize Groq API
const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const Main = () => {
  const [search, setSearch] = useState("");
  const [synopsis, setSynopsis] = useState(""); // For synopsis input
  const [bookData, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Romance", "Comedy", "Horror", "Action", "Sci-Fi", "Fantasy", "Thriller"];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((cat) => cat !== category)  // Remove category if it's already selected
        : [...prev, category];  // Add category if it's not selected
      console.log(updatedCategories); // Log the updated categories to check the state
      return updatedCategories;
    });
  };
  
  
  

  const fetchBooksByCategory = () => {
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    setLoading(true);
    const selected = selectedCategories.join("+");
    const apiKey = "AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU";

    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${selected}&key=${apiKey}&maxResults=40`)
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

  // Handle synopsis input and fetch books using Groq
  const handleSynopsisSearch = () => {
    if (!synopsis.trim()) {
      alert("Please enter a synopsis.");
      return;
    }

    setLoading(true);

    groq.chat.completions
      .create({
        messages: [{ role: "user", content: `Suggest book names based on this synopsis: ${synopsis}` }],
        model: "llama-3.3-70b-versatile",
      })
      .then((chatCompletion) => {
        const groqResponse = chatCompletion.choices[0]?.message?.content || "";
        const bookTitles = extractBookTitles(groqResponse);

        if (bookTitles.length > 0) {
          fetchBooksFromGoogle(bookTitles);
        } else {
          setLoading(false);
          alert("Couldn't find books for this synopsis. Try again.");
        }
      })
      .catch((error) => {
        console.log("Error with Groq API:", error);
        setLoading(false);
      });
  };

  // Extract book titles from Groq response
  const extractBookTitles = (response) => {
    return response.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
  };

  // Fetch books from Google Books API (Only for synopsis results)
  const fetchBooksFromGoogle = async (bookTitles) => {
    const apiKey = "AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU";
    const allBooks = [];

    for (const title of bookTitles) {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${apiKey}&maxResults=5`
        );

        if (res.data.items) {
          allBooks.push(res.data.items[0]);
        }
      } catch (err) {
        console.log("Error fetching book:", title, err);
      }
    }

    setData(allBooks);
    setLoading(false);
  };

  return (
    <>
      <div className="header">
      <h1 className="app-title">Book Recommendation App</h1>
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

      {/* Synopsis-Based Book Search */}
      <div className="synopsis-search">
        <h3>Find Books by Synopsis</h3>
        <textarea
          placeholder="Tell a synopsis..."
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        ></textarea>
        <button onClick={handleSynopsisSearch}>Search by Synopsis</button>
      </div>

      {/* Categories Section */}
      <div className="category-selector">
  <h3>Select Categories</h3>
  {categories.map((category) => (
    <label key={category}>
      <input 
        type="checkbox" 
        value={category}
        checked={selectedCategories.includes(category)}  // Ensure checkbox reflects the selected state
        onChange={() => handleCategoryChange(category)} // Handle category selection
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
          <div>
            {/* Filter books with price and online availability */}
            {bookData
              .sort((a, b) => {
                const priceA = a.saleInfo?.listPrice?.amount;
                const priceB = b.saleInfo?.listPrice?.amount;
                const hasBuyLinkA = a.saleInfo?.buyLink;
                const hasBuyLinkB = b.saleInfo?.buyLink;

                // Sort first by price availability, then by the presence of a buy link
                if (priceA && hasBuyLinkA && !(priceB && hasBuyLinkB)) return -1;
                if (priceB && hasBuyLinkB && !(priceA && hasBuyLinkA)) return 1;
                return 0;
              })
              .map((book) => {
                const { volumeInfo, saleInfo } = book;
                const title = volumeInfo.title;
                const authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown";
                const description = volumeInfo.description || "No description available.";
                const image = volumeInfo.imageLinks?.thumbnail;
                const price = saleInfo?.listPrice?.amount
                  ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}`
                  : "Not Available";
                const buyLink = saleInfo?.buyLink;

                return (
                  <div key={book.id} className="book-card">
                    <h3>{title}</h3>
                    <p><strong>Author(s):</strong> {authors}</p>
                    <p>{description}</p>
                    {image && <img src={image} alt={title} />}
                    <p><strong>Price:</strong> {price}</p>
                    {buyLink && (
                      <a href={buyLink} target="_blank" rel="noopener noreferrer">
                        Buy/Read Online
                      </a>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          !loading && <p>No books found.</p>
        )}
      </div>
    </>
  );
};

export default Main;
