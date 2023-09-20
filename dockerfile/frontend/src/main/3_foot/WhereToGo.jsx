// WhereToGo.js
import React, { useState } from "react";
import "./whereToGo.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Divider, InputBase, Paper } from "@mui/material";

function WhereToGo({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(keyword); // 검색어를 상위 컴포넌트로 전달
  };

  return (
    <div className="wtg-container">
      <h2>어디로 여행을 떠나시나요?</h2>
      <div className="searchBar-grid">
        <Paper
          className="searchBar-container"
          component="form"
          onSubmit={handleSubmit} // 폼 제출 이벤트 핸들러 연결
          sx={{
            p: "2px 4px",
            display: "flex",
            borderRadius: "20px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.30)",
          }}
        >
          <InputBase
            className="searchBar"
            sx={{ ml: 3, flex: 1 }}
            placeholder="지역명을 검색해 주세요"
            inputProps={{ "aria-label": "#" }}
            name="keyword"
            type="search"
            value={keyword} // 검색어 입력값을 상태에 연결
            onChange={(e) => setKeyword(e.target.value)} // 검색어 변경 이벤트 핸들러
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon style={{ fontSize: "37px" }} />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default WhereToGo;
