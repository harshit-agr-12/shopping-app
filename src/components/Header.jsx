import { Link, useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';

const Header = () => {
  const {totalItems} = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ ShopEasy</Link>
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