import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toCart, setToCart] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Product not found or failed to load.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setToCart(true);
  };

  const handleGoTOCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="image-section skeleton-box" />
        <div className="info-section">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text short" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-button" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
      <div className="image-section">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="info-section">
        <h2>{product.title}</h2>
        <p className="category">{product.category}</p>
        <p className="price">₹ {product.price}</p>
        <p className="description">{product.description}</p>
        {!toCart ? (
          <button onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <button onClick={handleGoTOCart}>Go To Cart</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
