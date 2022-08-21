import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../../images/logo.png";
import { FaUserAlt, FaSearch, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      profileIconUrl="/login"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      profileIconColor="black"
      profileIconSize="1.3vmax"
      searchIcon={true}
      SearchIconElement={FaSearch}
      searchIconColor="black"
      searchIconSize="1.3vmax"
      cartIcon={true}
      CartIconElement={FaShoppingCart}
      cartIconColor="black"
      cartIconSize="1.3vmax"
      searchIconMargin={10}
      cartIconMargin={10}
      profileIconMargin={10}
    />
  );
};

export default Header;
