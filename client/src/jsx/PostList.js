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
import { updateQuery, selectPost, sentFetchPosts, gotPosts } from 'redux/memSlice';
import Loading from 'jsx/Loading';
import { BACKEND_DOMAIN } from 'api';

function PostSummary({id: postId, title, body}) {
  const dispatch = useDispatch();
  return (
    <ListItem button className="post-summary" onClick={() => dispatch(selectPost(postId))}>
      <div className="list-item-text">
        <p className="primary">{title}</p>
        <p className="secondary">{body}</p>
      </div>
    </ListItem>
  )
}

export default function PostList() {
  const dispatch = useDispatch();
  const { query, postInfo, isLoadingPostInfo } = useSelector((store) => store.mem)
  function handleChange(e) {
    const text = e.target.value;
    dispatch(updateQuery(text));
  }
  function handleSubmit(e) {
    e.preventDefault();
    sentFetchPosts();
    console.log('fetch')
    const promise = fetch(`http://${BACKEND_DOMAIN}/results?query=${query}`)

    promise.then((res) => {
      return res.json();
    }).then((res) => {
      dispatch(gotPosts(res));
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
        isLoadingPostInfo
        ? <Loading />
        : postInfo.map((post, index) => {
            const isLast = index === postInfo.length-1;
            return (
              <React.Fragment key={index}>
                <PostSummary {...post.post}/>
                {isLast ? null : <Divider component="li" />}
              </React.Fragment>
            )
          })
      }
      </List>
    </div>
  )
}