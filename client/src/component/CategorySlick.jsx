import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategorySlick = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              dots: false,
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
        ],
      };

    const [category, setCategory] = useState([]);

    // All Category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(()=>{
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <>
      {category && <div className="home-page-slick">
        <div className="homepage-category">
          <Slider {...settings}>
            {category?.map((c) => (
              <div key={c._id} className="homepage-category-card">
                <Link to={`/category/${c._id}`}>
                  <img className="homepage-category-image" src={c.image} alt={c.name} />
                </Link>
                <div className="homepage-category-name">{c.name}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>}
    </>
  )
}

export default CategorySlick
