import { useState } from "react";
import { Menu, Button, MenuItem, Typography } from "@mui/material";

const SORT_BY_OPTIONS = [
  { value: "english", label: "이름순" },
  { value: "like", label: "좋아요순" },
];

export default function TourSort({ onSortByChange, currentSort }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOptionClick = (option) => {
    // 선택한 정렬 기준을 부모 컴포넌트로 전달
    onSortByChange(option.value);
    handleClose();
  };

  return (
    <>
      <Button color="inherit" disableRipple onClick={handleOpen}>
        정렬 :&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: "text.secondary" }}
        >
          {currentSort === "english" ? "이름순" : "좋아요순"}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentSort}
            onClick={() => handleOptionClick(option)}
            sx={{ typography: "body2" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
