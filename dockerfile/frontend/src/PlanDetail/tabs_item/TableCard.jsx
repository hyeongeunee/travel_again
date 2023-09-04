import React from "react";
import "../css/TableCard.css"
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RoomIcon from '@mui/icons-material/Room';
export default function TableCard(){
    const [isFavorite, setIsFavorite] = React.useState(false);
    const toggleFavorite = () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    };
    return(
        <div className="table-card-form">
            <div className="number-container">
                <p className="number">1</p>
            </div>
            <div className="loc-img-container">
                <img className="loc-img" src="/locimages/busan.jpg" alt="#" />
            </div>
            <p className="locName">1234</p>
            <div className="icon-container">
                <RoomIcon color="primary"/>
                <IconButton
                    onClick={toggleFavorite}>
                        {isFavorite ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon/>}
                </IconButton>
            </div>
        </div>
    )
}