import React from "react";

const AboutUs = () => {
  return (
    <div
      className="container my-5 d-flex flex-column align-items-center bg-black"
      
    >
      <h1 className="text-center text-danger fw-bold" style={styles.header}>
        About Us
      </h1>

      <div style={styles.card}>
        <p className="text-white mx-3" style={styles.text}>
          Welcome to CardShop! We are a passionate team of collectors and
          enthusiasts dedicated to providing high-quality collectible cards. Our
          mission is to create a community where collectors can easily find,
          buy, and trade their favorite cards.
        </p>

        <p className="text-white mx-3" style={styles.text}>
          Whether you're a casual collector or a seasoned pro, we offer a wide
          range of cards to suit your needs. Our curated selection ensures that
          you can find the perfect card to complete your collection.
        </p>

        <p className="text-white fw-bold" style={styles.text}>
          Thank you for visiting CardShop, and we hope you enjoy your experience
          with us!
        </p>
      </div>
      <div style={styles.buttonContainer}>
        <a href="/cards" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
          ← Back To Collection
        </a>
        <a href="/" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
          ← Back Home
        </a>
      </div>
    </div>
  );
};

const styles = {
  header: {
    fontSize: "3rem",
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    marginBottom: "30px",
    letterSpacing: "1px",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "10px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    marginBottom: "30px",
    maxWidth: "800px",
    width: "100%",
  },
  text: {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    marginBottom: "15px",
    color: "#ddd",
  },
};

export default AboutUs;
