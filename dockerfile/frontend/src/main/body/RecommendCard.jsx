import * as React from 'react';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import  IconButton  from '@mui/material/IconButton';
import { Grid, Stack } from '@mui/material';


export default function MediaCard() {
    const [isIconChange, setIsIconChange ] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(false);
    const toggleBtn = () => {
        setIsIconChange((PrevisIconChange)=>!PrevisIconChange)
    }
     const toggleFavorite = () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };
    
  return (
    <Card sx={{ width: 330 }}>
      <CardMedia
        sx={{ height: 400 }}
        image="https://source.unsplash.com/random/345×350"
        title="test"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          부산 광역시
        </Typography>
        <Typography variant="h7" color="">
          Busan
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="flex-end">
            <IconButton
                onClick={toggleFavorite}>
                    {isFavorite ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon/>}
            </IconButton>
            <IconButton 
                onClick={toggleBtn}
                type='stack'>
                    {isIconChange ? <TurnedInIcon/> : <TurnedInNotIcon/>}
            </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
}