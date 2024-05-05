// Icons
import { FiHeart } from "react-icons/fi";
import { AiOutlineShoppingCart, AiOutlineUserAdd  } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
// React-Router-Dom
import {Link} from "react-router-dom"
// 
import "./Nav.css";

const Nav = ({ handleInputChange, query }) => {
  return (
    <nav>
      <div className="nav-container">
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
      </div>
      <div className="profile-container">
        <Link to={'/'} >
          <FiHeart className="nav-icons" />
        </Link>
        <Link to={'/'} >
          <AiOutlineShoppingCart className="nav-icons" />
        </Link>
        <Link to={'/user-profile'} >
          <FaRegUser className="nav-icons" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
