import { useState } from "react";
import { Menu, Button, MenuItem, Typography } from "@mui/material";

const SORT_BY_OPTIONS = [
  { value: "hanguel", label: "이름순" },
  { value: "like", label: "좋아요순" },
  { value: "view", label: "조회수순" },
];

export default function ShopProductSort() {
  const [open, setOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState(SORT_BY_OPTIONS[1]); // 초기 값 설정

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option); // 사용자가 옵션을 선택할 때마다 선택한 값을 저장
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
          {selectedOption.label}
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
            selected={option.value === selectedOption.value}
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
