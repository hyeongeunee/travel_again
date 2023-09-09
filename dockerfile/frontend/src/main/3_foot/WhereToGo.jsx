import "./whereToGo.css";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Divider, InputBase, Paper } from "@mui/material";
import axios from 'axios';

function WhereToGo() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        // ------------ 나중에 서버랑 연결할 때 주석제거하기 ---------------------------
        const data = new FormData(event.currentTarget);
        const category = data.get('category')
        const keyword = data.get('keyword')
        const url = 'http://localhost:9000/tourlist/es/overview?searchValue=' + keyword 

        try {
            const response = await axios.post(url, {
                
                
            }); 
            console.log('서버 응답:', response.data);
        } catch (error) {
            console.error('오류:', error);
        }
    };
    return (
        <div className="wtg-container">
        <h2>어디로 여행을 떠나시나요?</h2>
        <div className="searchBar-grid">
        <Paper
          className="searchBar-container"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            borderRadius:"20px",
            boxShadow:" 0 4px 6px rgba(0,0,0,0.30)"
          }}
        >
          <InputBase
            className="searchBar"
            sx={{ ml: 3, flex: 1 }}
            placeholder="지역명을 검색해 주세요"
            inputProps={{ "aria-label": "#" }}
            name="keyword"
            type="search"
          />
          <IconButton type="button" sx={{ p: "10px"}} aria-label="search">
            <SearchIcon style={{fontSize:"37px"}} type="submit"/>
          </IconButton>
        </Paper>
        </div>
      </div>
    );
}

export default WhereToGo;
