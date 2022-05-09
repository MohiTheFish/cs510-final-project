import React from 'react';
import {
  List,
  ListItem,
  Divider,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { updateQuery, selectPost, sentFetchPosts, gotPosts } from 'redux/memSlice';
import Loading from 'jsx/Loading';
import { BACKEND_DOMAIN } from 'api';
import CancelIcon from '@mui/icons-material/Cancel';

function PostSummary({ post }) {
  const dispatch = useDispatch();
  const {title, body} = post.post;
  return (
    <ListItem button className="post-summary" onClick={() => dispatch(selectPost(post))}>
      <div className="list-item-text">
        <p className="primary">{title}</p>
        <p className="secondary">{body}</p>
      </div>
    </ListItem>
  )
}

export default function PostList() {
  const dispatch = useDispatch();
  const { query, lastFetchedQuery, postInfo, isLoadingPostInfo } = useSelector((store) => store.mem)
  function handleChange(e) {
    const text = e.target.value;
    dispatch(updateQuery(text));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (lastFetchedQuery === query) {
      return;
    }
    dispatch(sentFetchPosts());

    fetch(`http://${BACKEND_DOMAIN}/results?query=${query}`)
    .then(res =>  res.json())
    .then(res => {
      dispatch(gotPosts(res));
    });
  }
  function cancelQuery(e) {
    e.preventDefault();
    if (query === '') {
      return '';
    }
    dispatch(updateQuery(''));
    dispatch(sentFetchPosts());
    fetch(`http://${BACKEND_DOMAIN}/allposts`)
    .then(res => res.json())
    .then(res => {
      dispatch(gotPosts(res));
    })
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={cancelQuery}>
                  <CancelIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          variant="standard"
        />
      </form>
      
      <List className="post-list">
      {
        isLoadingPostInfo
        ? <Loading />
        : postInfo.map((post, index) => {
            const isLast = index === postInfo.length-1;
            console.log(post);
            return (
              <React.Fragment key={post.id}>
                <PostSummary post={post}/>
                {isLast ? null : <Divider component="li" />}
              </React.Fragment>
            )
          })
      }
      </List>
    </div>
  )
}