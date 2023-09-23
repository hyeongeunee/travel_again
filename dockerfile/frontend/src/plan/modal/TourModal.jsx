import React, { useState, useEffect, useRef } from 'react';
import './TourModal.css';
import CloseIcon from '@mui/icons-material/Close';
import tourjson from '../../utils/finalresult.json';
import { Button } from '@mui/material';

const TourModal = ({ isOpen, onClose, contentid }) => {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState('auto');
    

    useEffect(() => {
        if (contentRef.current) {
            const contentElement = contentRef.current;
            // 컨텐츠 높이가 100px 이상인 경우에만 "더보기" 표시
            if (contentElement.clientHeight < contentElement.scrollHeight) {
                setContentHeight('100px');
            }
        }
    }, [isOpen]);

    const contentRef = useRef(null);

    if (!isOpen) return null;

    const tourData = tourjson.find((item) => item.contentid === parseInt(contentid));
    

    const handleExpandToggle = () => {
        setExpanded(!expanded);
        setContentHeight(expanded ? '100px' : 'auto');
    };

    return (
        <div className="tour-modal-overlay">
            <div className="tour-modal">
                <div className="tour-modal-header">
                    <button className="tour-modal-close" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="tour-modal-grid">
                    <div className="tour-modal-text">
                        <div className="tour-madal-info">
                            <h1 style={{ marginTop: '0px' }}>{tourData.title}</h1>
                            <h3>{tourData.addr1}</h3>
                        </div>
                        <div className="tour-modal-image">
                            <img src={tourData.firstimage} alt={tourData.title} />
                        </div>
                        <div
                            className="tour-modal-content"
                            style={{
                                height: contentHeight,
                                overflowY: expanded ? 'auto' : 'hidden',
                            }}
                            ref={contentRef}
                        >
                            <p className="tour-modal-overview">
                                {tourData.overview}
                                {contentHeight === '100px' && (
                                    <strong className="more-link" onClick={handleExpandToggle}>
                                        {expanded ? '접기' : '더보기'}
                                    </strong>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="tour-modal-btn">
                        {/* <Button
                            className="tour-modal-addBtn"
                            size="medium"
                            variant="contained"
                            sx={{ mt: '3px', mb: '2px', mr: '10px' }}
                        >
                            추가
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourModal;
