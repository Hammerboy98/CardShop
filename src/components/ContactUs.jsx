import React from "react";
import MyFooter from "./MyFooter";

const ContactUs = () => {
  return (
    <div className="container my-5 d-flex flex-column align-items-center">
      <h1 className="text-center text-white fw-bold">Contact Us</h1>
      <p className="text-white">
        Have questions or need assistance? Feel free to reach out to us! We are
        here to help.
      </p>
      <p className="text-white fw-bold">
        <strong>Email:</strong> support@cardshop.com
      </p>
      <p className="text-white fw-bold">
        <strong>Phone:</strong> +123 456 7890
      </p>
      <p className="text-white">
        You can also follow us on our social media platforms for the latest
        updates and promotions!
      </p>
      <p className="text-white fw-bold">
        <strong>Address:</strong> 123 CardShop St., CardCity, CollectibleLand
      </p>
      <div style={{height:"170px"}}>
      <a href="/cards" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
            ← Torna alla collezione
          </a>
          <a href="/" className="btn btn-link mt-4 text-decoration-none text-white fw-bold">
            ← Torna alla home
          </a>
      </div>
    </div>
    
  );
};

export default ContactUs;
