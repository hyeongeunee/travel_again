import { useState } from "react";
import { Container, Stack } from "@mui/material";
import TourSort from "./TourSort";
import TourList from "./TourList";
import TourFilterSidebar from "./TourFilterSidebar";
import tourjson from "../../../utils/trip.json";

export default function TourListPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [sortedTourArray, setSortedTourArray] = useState([...tourjson]); // 원본 배열 복사
  const [sortBy, setSortBy] = useState(null); // 정렬 기준

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // 정렬 함수
  const sortData = (sortBy) => {
    const sortedArray = [...sortedTourArray];
    if (sortBy === "english") {
      // 이름으로 정렬 (여기에서는 engTitle 사용)
      sortedArray.sort((a, b) => {
        const nameA = a.engTitle.toLowerCase();
        const nameB = b.engTitle.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "like") {
      // 좋아요 수로 정렬
      sortedArray.sort((a, b) => b.likeCount - a.likeCount);
    }
    setSortedTourArray(sortedArray);
    setSortBy(sortBy);
  };

  return (
    <>
      <Container>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <TourFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <TourSort onSortByChange={sortData} currentSort={sortBy} />
          </Stack>
        </Stack>
        <TourList tourArray={sortedTourArray} />
      </Container>
    </>
  );
}
