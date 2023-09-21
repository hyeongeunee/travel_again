import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./css/PlanSearchBar.css"


export default function PlanSearchBar(onSearch) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(keyword); // 검색어를 상위 컴포넌트로 전달
  };


    return(
  <div className="plan-searchBar-grid">
    <Paper
      className="plan-searchBar-container"
      component="form"
      onSubmit={handleSubmit}
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
        placeholder="미구현"
        inputProps={{ "aria-label": "#" }}
        name="keyword"
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon style={{ fontSize: "24px" }} type="submit" />
      </IconButton>
    </Paper>
  </div>
  )
}
