import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = () => {
  const {totalItems} = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/login') return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ ShopEase</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart({totalItems})</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;