import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./css/PlanSearchBar.css"


export default function PlanSearchBar() {
    return(
  <div className="plan-searchBar-grid">
    <Paper
      className="plan-searchBar-container"
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        borderRadius: "20px",
        boxShadow: " 0 4px 6px rgba(0,0,0,0.30)",
      }}
    >
      <InputBase
        className="plan-searchBar"
        sx={{ ml: 3, flex: 1, fontSize: "14px" }}
        placeholder="키워드 입력"
        inputProps={{ "aria-label": "#" }}
        name="keyword"
        type="search"
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon style={{ fontSize: "24px" }} type="submit" />
      </IconButton>
    </Paper>
  </div>
  )
}
