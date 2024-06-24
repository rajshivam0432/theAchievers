import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import LazyLoad from "react-lazyload";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Wrap>
        <LazyLoad height={200} offset={100} once>
          <a>
            <img src="/images/dining.jpg" alt="" />
          </a>
        </LazyLoad>
      </Wrap>

      <Wrap>
        <LazyLoad height={200} offset={100} once>
          <a>
            <img src="/images/mess-menu.jpg" alt="" />
          </a>
        </LazyLoad>
      </Wrap>

      <Wrap>
        <LazyLoad height={200} offset={100} once>
          <a>
            <img src="/images/rebates.jpg" alt="" />
          </a>
        </LazyLoad>
      </Wrap>

      <Wrap>
        <LazyLoad height={200} offset={100} once>
          <a>
            <img src="/images/billing.jpg" alt="" />
          </a>
        </LazyLoad>
      </Wrap>

      <Wrap>
        <LazyLoad height={200} offset={100} once>
          <a>
            <img src="/images/complaints.jpg" alt="" />
          </a>
        </LazyLoad>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  width: 50%; /* Set the desired width */
  margin: 0 auto; /* Center the carousel */
  margin-top: 20px; /* Adjust margin-top as needed */

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  padding: 0 16px; /* Adjust padding as needed */

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: auto; /* Ensure the image scales correctly */
      object-fit: cover; /* Ensure the image covers the entire container */
      min-height: 460px; /* Set a minimum height as needed */
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;
