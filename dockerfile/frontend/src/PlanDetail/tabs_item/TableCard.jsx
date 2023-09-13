import React, { useState } from "react";
import "../css/TableCard.css"
import { IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RoomIcon from '@mui/icons-material/Room';

export default function TableCard({ day }) {
    const [favoriteStates, setFavoriteStates] = useState(day.map(() => false));

    const toggleFavorite = (index) => {
        const newFavoriteStates = [...favoriteStates];
        newFavoriteStates[index] = !newFavoriteStates[index];
        setFavoriteStates(newFavoriteStates);
    };

    return (
        day.map((item, index) => (
            <div className="table-card-form" key={index}>
                <div className="number-container">
                    <p className="number">{index + 1}</p>
                </div>
                <div className="loc-img-container">
                    <img className="loc-img" src={item.firstimage} alt="#" />
                </div>
                <p className="locName">{item.title}</p>
                <div className="icon-container">
                    <RoomIcon color="primary" />
                    <IconButton
                        onClick={() => toggleFavorite(index)}>
                        {favoriteStates[index] ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
            </div>
        ))
    );
}
