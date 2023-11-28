import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { MdMenuOpen } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import "./index.css";

function Header(props) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const { isSearch, fetchSearchUser } = props;

  const openMenu = () => {
    setMenu(true);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const onSearch = () => {
    if (search !== "") {
      fetchSearchUser(search);
    }
  };

  return (
    <nav className="nav-bar">
      <div className="header">
        <div className="header-top">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dpiaz73h0/image/upload/v1697363859/Group_7399Movies_1_nkjqn8.jpg"
              alt="Website logo"
              className="website-logo"
            />
          </Link>
          <ul className="header-items-card">
            <Link to="/">
              <li className="menu-item">Home</li>
            </Link>
            <Link to="/popular">
              <li className="menu-item">Popular</li>
            </Link>
          </ul>
        </div>
        <div className="header-items-bottom">
          {isSearch && (
            <input
              type="search"
              className="input-search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          )}
          <Link to="/search">
            <button type="button" onClick={onSearch} className="button">
              <HiOutlineSearch className="search-icon" />
            </button>
          </Link>
          <button type="button" className="button" onClick={openMenu}>
            <MdMenuOpen className="open-menu" />
          </button>
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dpiaz73h0/image/upload/v1696336739/Avatar_dk1uco.png"
              alt="profile"
              className="profile"
            />
          </Link>
        </div>
      </div>
      {menu && (
        <div className="footer-menu-card">
          <ul className="footer-items">
            <Link to="/">
              <li className="menu-item">Home</li>
            </Link>
            <Link to="/popular">
              <li className="menu-item">Popular</li>
            </Link>
            <Link to="/account">
              <li className="menu-item">Account</li>
            </Link>
            <button type="button" className="button" onClick={closeMenu}>
              <AiFillCloseCircle className="close-menu" />
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Header;