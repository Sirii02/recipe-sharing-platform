import React from "react";

const styles = {
  footer: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgb(229, 229, 229)",
    borderTop: "1px solid #ddd",
    marginTop: "20px",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#555",
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
        &#169; SavoryStack. All rights reserved. |{" "}
        <a href="#" style={styles.link}>Privacy Policy</a> |{" "}
        <a href="#" style={styles.link}>Terms of Service</a>
      </p>
    </footer>
  );
}

export default Footer;
