import {
  Card, Paper,
} from '@mui/material';

import {useSelector, useDispatch} from 'react-redux';

function FocusedPostContent(props) {
  return <div className="focused-post" {...props} />;
}

function FocusedPostCard(props) {
  const {className, ...otherProps} = props;
  return <Card className={`focused-post-card ${className || ''}`} elevation={4} {...otherProps} />;
}
/**
 * The expected process would be that expandedPost contains some post id
 * And then we fetch the post id
 * But I'll just use the mock data for the moment.
 */
export default function FocusedPost() {
  const {expandedPost, postPreviews} = useSelector((state) => state.mem);
  if (expandedPost === -1) {
    return (
      <FocusedPostContent>
        <FocusedPostCard className='initial-message'>
          Click a post on the left to view more information
        </FocusedPostCard>
      </FocusedPostContent>
    )
  }

  const post = postPreviews[expandedPost];
  return (
    <FocusedPostContent>
      <FocusedPostCard>
        <h3 className="primary">{post.title}</h3>
        <p className="secondary">{post.details}</p>
      </FocusedPostCard>
    </FocusedPostContent>
  );
}