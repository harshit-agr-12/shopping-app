// Home.jsx
import { useEffect, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
        setLoading(false);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (category) => {
    if (category === "") {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } else {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
    setFilteredCategory(category);
  };

  const handleSearch = (term) => {
    setSearchQuery(term);

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );

    setProducts(filtered);
  };

  return (
    <div className="home">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products  ..."
          value={searchQuery}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <select
          value={filteredCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="skeleton-card" key={index}>
              <div className="skeleton-img"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line" style={{ width: "60%" }}></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <img src={product.image} alt={product.title} />
              <h4>
                {product.title.length > 50
                  ? product.title.slice(0, 50) + "..."
                  : product.title}
              </h4>
              <p>₹ {product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
