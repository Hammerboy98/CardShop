import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaShippingFast, FaUndoAlt, FaBoxOpen, FaQuestionCircle, FaFileAlt, FaStoreAlt, FaUserAlt } from 'react-icons/fa';

const MyFooter = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row text-center">
          {/* Colonna per i link ai social media */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <ul className="list-unstyled d-flex flex-column align-items-center">
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaFacebook className="me-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaInstagram className="me-2" /> Instagram
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaTwitter className="me-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaLinkedin className="me-2" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaYoutube className="me-2" /> YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Colonna per altre informazioni */}
          <div className="col-md-4">
            <h5 className="fw-bold">Customer Service</h5>
            <ul className="list-unstyled d-flex flex-column align-items-center">
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaUndoAlt className="me-2" /> Returns
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaShippingFast className="me-2" /> Shipping
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaBoxOpen className="me-2" /> Packaging
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaQuestionCircle className="me-2" /> FAQs
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaFileAlt className="me-2" /> Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Colonna per altre info come "About" */}
          <div className="col-md-4">
            <h5 className="fw-bold">About Us</h5>
            <ul className="list-unstyled d-flex flex-column align-items-center">
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaStoreAlt className="me-2" /> Our Story
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaUserAlt className="me-2" /> Careers
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaUserAlt className="me-2" /> Contact Us
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none">
                  <FaFileAlt className="me-2" /> Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center pt-3">
        <p className="mb-0">© 2025 CardShop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MyFooter;
