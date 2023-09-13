import React from "react";
import "./Modal.css";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CloseIcon from "@mui/icons-material/Close";
import tourjson from "../../../../utils/trip.json";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Modal = ({ isOpen, onClose, areacode }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [isBookMark, setIsBookMark] = React.useState(false);
    const [favorite, setFavorite] = React.useState(0);
    const [bookmark, setBookMark] = React.useState(0);

    if (!isOpen) return null;
    const areaData = tourjson.find((item) => item.areacode === areacode);

    const toggleBookMark = () => {
        setIsBookMark((prevIsBookMark) => !prevIsBookMark);
        if (isBookMark) {
            setBookMark(bookmark - 1);
        } else {
            setBookMark(bookmark + 1);
        }
    };

    const toggleFavorite = () => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);

        if (isFavorite) {
            setFavorite(favorite - 1);
        } else {
            setFavorite(favorite + 1);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-grid">
                    <div className="modal-text">
                        <h1 style={{ marginTop: "0px" }}>{areaData.korTitle}</h1>
                        <h3 style={{ marginBottom: "px" }}>{areaData.engTitle}</h3>
                        <div className="modal-likeCount">
                            <IconButton style={{ padding: "0" }} onClick={toggleBookMark} type="stack">
                                {isBookMark ? (
                                    <TurnedInIcon sx={{ fontSize: 30 }} />
                                ) : (
                                    <TurnedInNotIcon sx={{ fontSize: 30 }} />
                                )}
                            </IconButton>
                            <p style={{ margin: 0, paddingRight: "3px" }}>{areaData.bookMarkCount + bookmark}</p>
                            <IconButton onClick={toggleFavorite} style={{ padding: "0" }}>
                                {isFavorite ? (
                                    <FavoriteIcon color="error" sx={{ fontSize: 30 }} />
                                ) : (
                                    <FavoriteBorderIcon sx={{ fontSize: 30 }} />
                                )}
                            </IconButton>
                            <p style={{ margin: 0, paddingRight: "3px", paddingLeft: "3px" }}>
                                {areaData.likeCount + favorite}
                            </p>
                        </div>
                        <p>{areaData.description}</p>
                        <div className="modal-icon"></div>
                    </div>
                    <div className="modal-image">
                        <img src={areaData.locimages} alt={areaData.korTitle} />
                    </div>
                </div>
                <Link to={`/plan`} state={{ areaData: areaData }}>
                    <Button className="modal-button" endIcon={<ChevronRightIcon />}>
                        일정 생성하기
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Modal;
