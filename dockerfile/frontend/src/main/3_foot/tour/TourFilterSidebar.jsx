import PropTypes from "prop-types";
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  // IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import FilterAlert from "./modal/FilterAlert";
// components
// import Iconify from '../../../components/iconify';
// import Scrollbar from "../../../components/scrollbar";
// import { ColorMultiPicker } from "../../../components/color-utils";

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];
export const FILTER_GENDER_OPTIONS = ["남성", "여성"];
export const FILTER_CATEGORY_OPTIONS = [
  "ALL",
  "10~20",
  "20~30",
  "30~40",
  "40~60",
];

export const FILTER_PRICE_OPTIONS = [
  { value: "activity", label: "액티비티" },
  { value: "healing", label: "힐링" },
  { value: "foodie", label: "식도락" },
];

// ----------------------------------------------------------------------

TourFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function TourFilterSidebar({
  openFilter,
  onOpenFilter,
  onCloseFilter,
}) {
  const [isFilterAlertOpen, setFilterAlertOpen] = useState(false);

  const handleFilterAlertOpen = () => {
    setFilterAlertOpen(true);
  };

  const handleFilterAlertClose = () => {
    setFilterAlertOpen(false);
  };

  return (
    <>
      <Button disableRipple color="inherit" onClick={onOpenFilter}>
        필터&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: {
            width: 280,
            border: "none",
            overflow: "hidden",
            overflowY: "auto",
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Stack>
        <Stack spacing={3} sx={{ p: 3 }}>
          <div>
            <Typography variant="subtitle1" gutterBottom>
              성별
            </Typography>
            <FormGroup>
              {FILTER_GENDER_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                />
              ))}
            </FormGroup>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              연령대별
            </Typography>
            <RadioGroup>
              {FILTER_CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <Typography variant="subtitle1" gutterBottom>
              테마
            </Typography>
            <RadioGroup>
              {FILTER_PRICE_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </div>
        </Stack>
        {/* </Scrollbar> */}

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={handleFilterAlertOpen}
            // startIcon={<Iconify icon="ic:round-clear-all" />}
          >검색하기</Button>
        </Box>
        <FilterAlert
          open={isFilterAlertOpen}
          onClose={handleFilterAlertClose}
        />
      </Drawer>
    </>
  );
}
export { default as TourFilterSideBar } from "./TourFilterSidebar";
