import React from 'react';
import {
  List,
  ListItem,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, selectPost } from 'redux/memSlice';

function PostSummary({postId, title, details}) {
  const dispatch = useDispatch();
  return (
    <ListItem button className="post-summary" onClick={() => dispatch(selectPost(postId))}>
      <div className="list-item-text">
        <p className="primary">{title}</p>
        <p className="secondary">{details}</p>
      </div>
    </ListItem>
  )
}

export default function PostList() {
  const dispatch = useDispatch();
  const { query, postPreviews } = useSelector((store) => store.mem)
  function handleChange(e) {
    const text = e.target.value;
    dispatch(updateQuery(text));
  }
  return (
    <div className="post-list">
      <TextField
        onChange={handleChange}
        value={query}
        label="Type to search something in MEMSrch."
        sx={{
          marginLeft: '10px',
          width: 'calc(100% - 10px)',
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
      <List>
        {
          postPreviews.map((post, index) => {
            const isLast = index === postPreviews.length-1;
            return (
              <React.Fragment key={index}>
                <PostSummary {...post}/>
                {isLast ? null : <Divider component="li" />}
              </React.Fragment>
            )
          })
        }
      </List>
    </div>
  )
}