import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import "./TourCard.css"
import Modal from "./modal/Modal";




// components


// ----------------------------------------------------------------------



const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});
// ----------------------------------------------------------------------

TourCard.propTypes = {  
  tourArray: PropTypes.object,
};


export default function TourCard({ tourArray ,}) {
  const [modalOpen, setModalOpen] = useState(false);
        const openModal = () => {
            setModalOpen(true);
        };

        const closeModal = () => {
            setModalOpen(false);
        };
  const { korTitle, locimages, engTitle, areacode} = tourArray;
  
  return (
    <>
    <Card className="tourCard-container" style={{boxShadow:"none", transition:"0.3s"}} onClick={openModal}>
        <Box sx={{ pt: "100%", position: "relative" }}>
          
          <StyledProductImg className="modal-img" style={{borderRadius:"15px", height:"110%"}} alt={korTitle} src={locimages} />
        </Box>

        <Stack>

          <Box style={{padding:"2%", paddingTop:"14%", fontSize:"13.5px", color:"#9E9E9E"}} >
            <Typography variant="subtitle2" noWrap style={{fontSize:"25px", color:"black"}} >
            {engTitle}
            </Typography>
            {korTitle}
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <Modal isOpen={modalOpen} onClose={closeModal} areacode={areacode}/>
     </>
  );
}
