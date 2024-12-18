import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/vehicles" style={styles.link}>Manage Vehicles</Link>
        <Link to="/invoices" style={styles.link}>Manage Invoices</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    background: "#333",
    padding: "10px 20px",
    color: "white",
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Header;
