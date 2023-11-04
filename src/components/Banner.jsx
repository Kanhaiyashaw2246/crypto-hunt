import React from "react";
import "./styles/banner.css";
import { Container } from "@mui/material";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import img4 from "../images/img4.png";
import img5 from "../images/img5.png";
import Carousel from "./Carousel";

function Banner() {
  return (
    <>
      <div className="banner">
        <Container className="banner-container">
          <div className="brandName">
            <h1>Welcome to <div>Crypto Trendz <span>‖</span></div></h1>
            <p>Get all the info regarding your favorite crypto currency</p>
          </div>
          <div className="transform-container">
            <div className="transformer">
              <img src={img2} alt="img" />
            </div>
            <div className="transformer1">
              <img src={img3} alt="img" />
            </div>
            <div className="transformer">
              <img src={img4} alt="img" />
            </div>
            <div className="transformer1">
              <img src={img5} alt="img" />
            </div>
          </div>
         
        
        </Container>
      </div>
      <Carousel/>
    </>
  );
}

export default Banner;
