import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./css/MainCarousel.css";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { textOverCut } from "../../util/textOverCut";

export default function MainCarousel() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.42:9000/tourlist/es/recCountDesc/all"
      );
      setData(response.data.data); // 가져온 데이터를 state에 저장합니다.
    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const dataChunks = chunkArray(data, 3);

  return (
    <Carousel
      className="carousel"
      indicators={false}
      animation="slide"
      cycleNavigation={true}
      autoPlay={false}
      navButtonsAlwaysVisible={true}
    >
      {dataChunks.map((chunk, chunkIndex) => (
        <div key={chunkIndex} className="carousel-list">
          {chunk.map((item, index) => (
            <Card key={index} sx={{ width: 330 }}>
              <CardMedia sx={{ height: 350 }} image={item.firstimage} title="test" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {textOverCut(item.title, 14, '...')}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container justifyContent="flex-end">
                  <div style={{ display: "flex" }}>
                    <FavoriteIcon color="error" style={{ padding: "5%" }} />
                    <p style={{ margin: "0" }}>{item.recommendCount}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <StarIcon style={{ color: "#FACC2E", padding: "5%" }} />
                    <p style={{ margin: "0" }}></p>
                  </div>
                </Grid>
              </CardActions>
            </Card>
          ))}
        </div>
      ))}
    </Carousel>
  );
}
