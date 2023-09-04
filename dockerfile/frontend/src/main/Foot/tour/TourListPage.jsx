import { useState } from "react";
// @mui
import { Container, Stack } from "@mui/material";
// components
import TourSort from "./TourSort";
import TourList from "./TourList";
import TourFilterSidebar from "./TourFilterSidebar";
// mock
import tourjson from "../../../trip.json"

// ----------------------------------------------------------------------

export default function TourListPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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
            <TourSort />
          </Stack>
        </Stack>
        <TourList tourArray={tourjson} />
      </Container>
    </>
  );
}
