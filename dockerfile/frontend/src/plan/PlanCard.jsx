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

export default function PlanCard({ selectedItems, setSelectedItems, selectedIndex, areaData }) {
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = (contentid) => {
        setSelectedContentId(contentid);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    const [tourList, setTourList] = useState([]);
    const [selectedContentId, setSelectedContentId] = useState(null);
    useEffect(() => {
        // API에서 데이터를 가져오는 함수
        async function fetchData() {
            try {
                // 테스트 코드입니다
                // const response = await fetch('http://localhost:3001/items'); // TODO : 서버쪽 데이터 들고오기
                // if (!response.ok) {
                //     throw new Error('네트워크 응답이 올바르지 않습니다');
                // }
                // const jsonData = await response.json();
                setTourList(output); // TODO : 여기도 실제 데이터 들어올 때는 수정하기
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        }
        // fetchData 함수 호출
        fetchData();
    }, []);

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

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePreviousPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage]);

    const handleNextPage = useCallback(() => {
        const filteredItems = tourList.filter((item) => item.areacode === areaData.areacode);
        const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

        if (currentPage < pageCount - 1) {
            setCurrentPage(currentPage + 1);
        }
    }, [currentPage, areaData.areacode, tourList]);

    const filteredItems = useMemo(() => {
        return tourList.filter((item) => item.areacode === areaData.areacode);
    }, [areaData.areacode, tourList]);

    const displayedItems = useMemo(() => {
        return filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    }, [currentPage, filteredItems]);

    return (
        <>
            <Divider>
                <h3 className="RecList">추천 관광지</h3>
            </Divider>
            {displayedItems.map((item, i) => (
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
                        <div>
                            <FavoriteIcon sx={{ fontSize: 13, color: "#F44336" }} />
                            <StarIcon sx={{ fontSize: 14, color: "#FBC02D" }} />
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
                <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    {" "}
                    <ArrowBackIosNewIcon style={{ fontSize: "16px" }} />
                </Button>

                <Button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage) - 1}
                >
                    <ArrowForwardIosIcon style={{ fontSize: "16px" }} />
                </Button>
                <TourModal isOpen={modalOpen} onClose={closeModal} contentid={selectedContentId} />
            </div>
        </>
    );
}
