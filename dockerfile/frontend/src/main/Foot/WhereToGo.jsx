import './whereToGo.css';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import NativeSelect from '@mui/material/NativeSelect';

function WhereToGo() {
    return (
        <div className="container">
            <h2>어디로 여행을 떠나시나요?</h2>
            <div style={{ margin: 20, padding: 20 }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '80ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {' '}
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <NativeSelect
                            defaultValue={'none'}
                            inputProps={{
                                name: 'category',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={'title'}>여행지</option>
                            <option value={'seoul'}>서울</option>
                            <option value={'busan'}>부산</option>
                            <option value={'daejeon'}>대전</option>
                        </NativeSelect>
                    </FormControl>
                    <TextField id="standard-search" type="search" variant="standard" />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Box>
            </div>
        </div>
    );
}

export default WhereToGo;
