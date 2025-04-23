import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa"; 

const ContactUs = () => {
  return (
    <div className="container my-5 d-flex flex-column align-items-center" style={styles.container}>
      <h1 className="text-center text-danger fw-bold" style={styles.header}>Contact Us</h1>
      
      <div style={styles.card}>
        <p className="text-white" style={styles.text}>
          Have questions or need assistance? Feel free to reach out to us! We are here to help.
        </p>
        
        <div style={styles.contactItem}>
          <FaEnvelope size={24} color="#fff" />
          <p className="text-white fw-bold" style={styles.contactText}>
            <strong>Email:</strong> support@cardshop.com
          </p>
        </div>
        
        <div style={styles.contactItem}>
          <FaPhoneAlt size={24} color="#fff" />
          <p className="text-white fw-bold" style={styles.contactText}>
            <strong>Phone:</strong> +123 456 7890
          </p>
        </div>

        <div style={styles.contactItem}>
          <FaMapMarkerAlt size={24} color="#fff" />
          <p className="text-white fw-bold" style={styles.contactText}>
            <strong>Address:</strong> 123 CardShop St., CardCity, CollectibleLand
          </p>
        </div>

        <p className="text-white" style={styles.text}>
          You can also follow us on our social media platforms for the latest updates and promotions!
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
    fontSize: '3rem',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
    marginBottom: '30px',
    letterSpacing: '1px',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '30px',
  },
  text: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '15px',
    color: '#ddd',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  contactText: {
    marginLeft: '15px',
    fontSize: '1.1rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '800px',
  }
};

export default ContactUs;

