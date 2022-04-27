import {
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

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
      <ListItemText
        primary={title}
        secondary={details}
      />
    </ListItem>
  )
}

export default function PostList() {
  return (
    <div className="post-list">
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