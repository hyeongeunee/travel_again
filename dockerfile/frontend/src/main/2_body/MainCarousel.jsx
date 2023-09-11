import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./css/MainCarousel.css";
import RecommendCard from "./RecommendCard";
import axios from "axios";

export default function MainCarousel() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("#");
      setData(response.data); // 가져온 데이터를 state에 저장합니다.
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Carousel
      className="carousel"
      indicators={false}
      animation="slide"
      cycleNavigation={true}
      duration="600"
      navButtonsAlwaysVisible={true}
    >
      <div className="carousel-list">
        <RecommendCard />
        <RecommendCard />
        <RecommendCard />
      </div>
    </Carousel>
  );
}
