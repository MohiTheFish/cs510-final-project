import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import PostList from 'jsx/PostList';
import FocusedPost from 'jsx/FocusedPost';


export default function MainPage() {
  return (
    <Paper id="memsrch-root">
      <header>
        <h1>MEMSrch</h1>
      </header>
      <div className="memsrch-content">
        <PostList />
        <Divider orientation='vertical' flexItem className="gutter" />
        <FocusedPost />
      </div>
    </Paper>
  )
}