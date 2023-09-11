import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";

import { Grid, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function RecommendCard() {
  return (
    <Card sx={{ width: 330 }}>
      <CardMedia
        sx={{ height: 350 }}
        image="https://source.unsplash.com/random/345×350"
        title="test"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          관광지 제목
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="flex-end">
          <div style={{ display: "flex" }}>
            <FavoriteIcon color="error" style={{ padding:"5%"}} />
            <p style={{ margin: "0" }}>123</p>
          </div>
          <div style={{ display: "flex" }}>
            <StarIcon  style={{ color: "#FACC2E", padding:"5%" }} />
            <p style={{ margin: "0" }}>44</p>
          </div>
        </Grid>
      </CardActions>
    </Card>
  );
}
