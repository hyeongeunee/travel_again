import React, { useState, useEffect, useCallback, useMemo } from "react";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Card } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import StarIcon from "@mui/icons-material/Star";
import output from "../utils/finalresult.json";
import { textOverCut } from "../util/textOverCut";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TourModal from "./modal/TourModal";
import Divider from "@mui/material/Divider";
import axios from "axios";
import PlanSearchBar from "./PlanSearchBar";

export default function PlanCard({ selectedItems, setSelectedItems, selectedIndex, areaData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [tourList, setTourList] = useState([]);
    const [selectedContentId, setSelectedContentId] = useState(null);
    const [data, setData] = useState([]); 

    const openModal = (contentid) => {
        setSelectedContentId(contentid);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    const handleSearch = (searchData) => {
        setData(searchData);
      };

    useEffect(() => {
        // API에서 데이터를 가져오는 함수
        async function fetchData() {
            try {
                const response = await axios(`http://192.168.0.86:9000/tourlist/es/list/areacode/${areaData.areacode}?page=${page}&size=6`);
                if (response.status !== 200) {
                    throw new Error("네트워크 응답이 올바르지 않습니다");
                }

                const jsonData = await response.data.data.content;

                console.log(jsonData)
                setTourList(jsonData);
                
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
            
        }
        function searchData(){
            setTourList(data);
        }
        if(data.length <= 0){
            fetchData();
        }else{
            searchData()
        }
    }, [setTourList, page, areaData.areacode, data]);
    console.log(data)
    const handleAddButtonClick = useCallback(
        (item) => {
            const selectedDate = new Date().toISOString().substr(0, 10);
            let updatedSelectedItems = [...selectedItems];

            if (!Array.isArray(updatedSelectedItems[selectedIndex])) {
                updatedSelectedItems[selectedIndex] = [];
            }

            updatedSelectedItems[selectedIndex].push({ ...item, date: selectedDate });
            setSelectedItems(updatedSelectedItems);

            const updatedTourList = tourList.filter((dataItem) => dataItem.contentid !== item.contentid);
            setTourList(updatedTourList);
        },
        [selectedItems, setSelectedItems, selectedIndex, tourList]
    );

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };
    
    const handlePrev = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };



    return (
        <>
            <PlanSearchBar areaData={areaData} onSearch={handleSearch} page={page}/>
            <Divider>
                <h3 className="RecList">추천 관광지</h3>
            </Divider>
            {tourList.map((item, i) => (
                <Card
                    key={item.contentId}
                    sx={{
                        display: "flex",
                        width: "auto",
                        height: "100px",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: "8px",
                    }}
                >
                    <CardMedia
                        component="img"
                        onClick={() => openModal(item.contentid)}
                        sx={{
                            width: 70,
                            height: 70,
                            flexGrow: "1",
                            borderRadius: "5px",
                            marginLeft: "10px",
                        }}
                        image={item.firstimage}
                        alt={item.title}
                    />
                    <CardContent sx={{ position: "static", flexGrow: "5" }} onClick={() => openModal(item.contentid)}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                fontSize: 10,
                            }}
                        >
                            {textOverCut(item.title, 10.8, "...")}
                        </Typography>
                        <Typography variant="div">
                            <span
                                style={{
                                    fontSize: "1px",
                                    fontWeight: "bolder",
                                    color: "skyblue",
                                    marginTop: "-2",
                                }}
                            >
                                도로명
                            </span>
                            <Typography variant="h6" sx={{ fontSize: 8.3 }}>
                                {textOverCut(item.addr1, 15, "...")}
                            </Typography>
                        </Typography>
                        <div style={{display:"flex"}}>
                            <FavoriteIcon sx={{ fontSize: 13, color: "#F44336" }} />
                            <p style={{margin:"0", fontSize:"2px"}}>{item.recommendCount}</p>
                            <StarIcon sx={{ fontSize: 14, color: "#FBC02D" }} />
                            <p style={{margin:"0", fontSize:"2px"}}>{item.rating}</p>
                        </div>
                    </CardContent>
                    <div
                        style={{
                            flexGrow: "1",
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            className="addBtn"
                            onClick={() => handleAddButtonClick(item)}
                            sx={{
                                height: "30px",
                                width: "30px",
                                padding: "0",
                                minWidth: "0",
                                marginRight: "9px",
                            }}
                        >
                            <AddBoxRoundedIcon />
                        </Button>
                    </div>
                </Card>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handlePrev} disabled={page === 0}>
                    {" "}
                    <ArrowBackIosNewIcon style={{ fontSize: "16px" }} />
                </Button>

                <Button
                    onClick={handleNext}
                 
                >
                    <ArrowForwardIosIcon style={{ fontSize: "16px" }} />
                </Button>
                <TourModal isOpen={modalOpen} onClose={closeModal} contentid={selectedContentId} />
            </div>
        </>
    );
}