import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#e5e5e5",
    borderTop: "1px solid #ddd",
    marginTop: "20px",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#555",
    margin: 0,
  },
  link: {
    color: "#555",
    textDecoration: "none",
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>
        &#169; {new Date().getFullYear()} SavoryStack. All rights reserved. |{" "}
        <Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link> |{" "}
        <Link to="/terms-of-service" style={styles.link}>Terms of Service</Link>
      </p>
    </footer>
  );
}

export default Footer;
