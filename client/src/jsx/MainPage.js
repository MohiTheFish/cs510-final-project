import Paper from '@mui/material/Paper';
import PostList from 'jsx/PostList';


export default function MainPage() {
  return (
    <Paper id="memsrch-root">
      <header>
        <h1>MEMSrch</h1>
      </header>
      <div className="">
        <PostList />
      </div>
    </Paper>
  )
}