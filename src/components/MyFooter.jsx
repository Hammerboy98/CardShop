import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaShippingFast, FaUndoAlt, FaBoxOpen, FaQuestionCircle, FaFileAlt, FaStoreAlt, FaUserAlt } from 'react-icons/fa';

const MyFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-darkblue-500 to-black text-white mt-5 pt-5 pb-3">
      <div className="container">
        <div className="row text-center">
          {/* Colonna per i link ai social media */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaFacebook className="me-2" style={{ fontSize: '1.5em' }} /> Facebook
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaInstagram className="me-2" style={{ fontSize: '1.5em' }} /> Instagram
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaTwitter className="me-2" style={{ fontSize: '1.5em' }} /> Twitter
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaLinkedin className="me-2" style={{ fontSize: '1.5em' }} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaYoutube className="me-2" style={{ fontSize: '1.5em' }} /> YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Colonna per altre informazioni */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaUndoAlt className="me-2" style={{ fontSize: '1.5em' }} /> Returns
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaShippingFast className="me-2" style={{ fontSize: '1.5em' }} /> Shipping
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaBoxOpen className="me-2" style={{ fontSize: '1.5em' }} /> Packaging
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaQuestionCircle className="me-2" style={{ fontSize: '1.5em' }} /> FAQs
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaFileAlt className="me-2" style={{ fontSize: '1.5em' }} /> Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Colonna per altre info come "About" */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">About Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaStoreAlt className="me-2" style={{ fontSize: '1.5em' }} /> Our Story
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaUserAlt className="me-2" style={{ fontSize: '1.5em' }} /> Careers
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaUserAlt className="me-2" style={{ fontSize: '1.5em' }} /> Contact Us
                </a>
              </li>
              <li>
                <a href="javascript:void(0)" className="text-white d-flex align-items-center text-decoration-none mb-2 hover-effect">
                  <FaFileAlt className="me-2" style={{ fontSize: '1.5em' }} /> Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: '#ddd' }} />

        <div className="text-center pt-3">
          <p className="mb-0">© 2025 CardShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;

