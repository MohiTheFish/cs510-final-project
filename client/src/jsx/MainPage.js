import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import PostList from 'jsx/PostList';
import FocusedPost from 'jsx/FocusedPost';
import { useDispatch } from 'react-redux';
import { selectPost } from 'redux/memSlice';


export default function MainPage() {
  const dispatch = useDispatch();
  return (
    <Paper id="memsrch-root">
      <header>
        <h1 className="home" onClick={() => dispatch(selectPost(null))} role='button'>
          MEMSrch
        </h1>
      </header>
      <div className="memsrch-content">
        <PostList />
        <Divider orientation='vertical' flexItem className="gutter" />
        <FocusedPost />
      </div>
    </Paper>
  )
}