import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Card } from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import StarIcon from '@mui/icons-material/Star';
// import output from './finalresult.json';
import { textOverCut } from './textOverCut.js';

export default function TourCard({ selectedItems, setSelectedItems, selectedIndex }) {
    const [tourList, setTourList] = useState([]);

    useEffect(() => {
        // API에서 데이터를 가져오는 함수
        async function fetchData() {
            try {
                // 테스트 코드입니다
                const response = await fetch('http://localhost:3001/items'); // 엔드포인트 URL 수정 필요
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }
                const jsonData = await response.json();
                setTourList(jsonData);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            }
        }
        // fetchData 함수 호출
        fetchData();
    }, []);

    // 항목을 추가하는 함수
    const handleAddButtonClick = (item) => {
        const selectedDate = new Date().toISOString().substr(0, 10);
        let updatedArray = [...selectedItems];

        // updatedArray[selectedIndex]가 배열이 아니거나 null 또는 undefined일 때 초기화
        if (!Array.isArray(updatedArray[selectedIndex])) {
            updatedArray[selectedIndex] = [];
        }

        updatedArray[selectedIndex].push({ ...item, date: selectedDate });

        setSelectedItems(updatedArray);

        // 선택된 항목을 tourList 배열에서 제거
        const updatedData = tourList.filter((dataItem) => dataItem.contentid !== item.contentid);
        setTourList(updatedData);
    };

    return (
        <>
            <h3>추천 관광지</h3>
            <hr />
            {tourList.map(
                (item, i) =>
                    item.areacode === 1 && (
                        <Card
                            key={item.contentId}
                            sx={{
                                display: 'flex',
                                width: 'auto',
                                height: '100px',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: '8px',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 70,
                                    height: 70,
                                    flexGrow: '1',
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                }}
                                image={item.firstimage}
                                alt={item.title}
                            />
                            <CardContent sx={{ position: 'static', flexGrow: '5' }}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: 12.8,
                                    }}
                                >
                                    {textOverCut(item.title, 10.8, '...')}
                                </Typography>
                                <Typography variant="div">
                                    <span
                                        style={{
                                            fontSize: '1px',
                                            fontWeight: 'bolder',
                                            color: 'skyblue',
                                            marginTop: '-2',
                                        }}
                                    >
                                        도로명
                                    </span>
                                    <Typography variant="h6" sx={{ fontSize: 8.3 }}>
                                        {textOverCut(item.addr1, 15, '...')}
                                    </Typography>
                                </Typography>
                                <div>
                                    <FavoriteIcon sx={{ fontSize: 13, color: '#F44336' }} />
                                    <StarIcon sx={{ fontSize: 14, color: '#FBC02D' }} />
                                </div>
                            </CardContent>
                            <div
                                style={{
                                    flexGrow: '1',
                                    display: 'flex',
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    className="addBtn"
                                    onClick={() => handleAddButtonClick(item)}
                                    sx={{
                                        height: '30px',
                                        width: '30px',
                                        padding: '0',
                                        minWidth: '0',
                                        marginRight: '9px',
                                    }}
                                >
                                    <AddBoxRoundedIcon />
                                </Button>
                            </div>
                        </Card>
                    )
            )}
        </>
    );
}
