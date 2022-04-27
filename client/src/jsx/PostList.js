import React, { useState } from 'react';
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
import Loading from 'jsx/Loading';

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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { query, postPreviews } = useSelector((store) => store.mem)
  function handleChange(e) {
    const text = e.target.value;
    dispatch(updateQuery(text));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Got the data');
      }, 500)
    });

    promise.then((res) => {
      setIsLoading(false);
    });
  }
  return (
    <div className="post-list-container">

      <form onSubmit={handleSubmit}>
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
      </form>
      
      <List className="post-list">
      {
        isLoading
        ? <Loading />
        : postPreviews.map((post, index) => {
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