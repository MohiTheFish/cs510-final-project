import {
  List,
  ListItem,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const POST_PREVIEWS = [
  {
    title: 'CS510 Assignment 1',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
  {
    title: 'CS510 Assignment 2',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
  {
    title: 'CS510 Assignment 3',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
  {
    title: 'Semantic Analysis Confusion',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
]

function PostSummary({title, details}) {
  return (
    <ListItem button className="post-summary">
      {/* <ListItemText
        className='post-summary-text'
        primary={title}
        secondary={details}
      /> */}
      <div className="list-item-text">
        <p className="primary">{title}</p>
        <p className="secondary">{details}</p>
      </div>
    </ListItem>
  )
}

export default function PostList() {
  function handleChange(e) {
    const text = e.target.value;
  }
  return (
    <div className="post-list">
      <TextField
        onChange={handleChange}
        label="Type to search something in MEMSrch."
        sx={{
          width: '100%',
          marginLeft: '10px'
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
          POST_PREVIEWS.map((post, index) => {
            const isLast = index === POST_PREVIEWS.length-1;
            return (
              <>
                <PostSummary key={index} {...post}/>
                {isLast ? null : <Divider component="li" />}
              </>
            )
          })
        }
      </List>
    </div>
  )
}