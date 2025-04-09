import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // <-- New

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert("Product added to cart!");
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

  return (
    <div className="product-detail-container">
      <div className="image-section">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="info-section">
        <h2>{product.title}</h2>
        <p className="category">{product.category}</p>
        <p className="price">₹ {product.price}</p>
        <p className="description">{product.description}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
