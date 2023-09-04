import React from 'react';
import "./Modal.css"
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloseIcon from '@mui/icons-material/Close';
import tourjson from "../../../../trip.json"
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, areacode }) => {
    if (!isOpen) return null;
    const areaData = tourjson.find(item => item.areacode === areacode);

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <button className="modal-close" onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </div>
                <div className="modal-grid">
                        <div className="modal-text">
                            <h1 style={{marginTop:"0px"}}>{areaData.korTitle}</h1>
                            <h3>{areaData.engTitle}</h3>
                            <p>
                                {areaData.description}
                            </p>
                            <div className='modal-icon'> 
                                <PersonIcon sx={{ fontSize: 45}} />
                                <FavoriteIcon sx={{ fontSize: 45}} />
                                <BookmarkIcon sx={{ fontSize: 45 }} />
                            </div>
                        </div>
                        <div className="modal-image">
                            <img src={areaData.locimages} alt={areaData.korTitle} />
                        </div>
                    </div>
                <Link to="/plan">
                    <button className="modal-button" >
                        일정 생성하기
                    </button>
                </Link>
            </div>
            
        </div>
    );
};

export default Modal;