import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

import PostList from 'jsx/PostList';


export default function MainPage() {
  function handleChange(e) {
    const text = e.target.value;
  }
  return (
    <Paper id="memsrch-root">
      <header>
        <h1>MEMSrch</h1>
        <TextField
          onChange={handleChange}
          label="Type to search something in MEMSrch."
          sx={{
            width: '100%'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </header>
      <div className="">
        <PostList />
      </div>
    </Paper>
  )
}