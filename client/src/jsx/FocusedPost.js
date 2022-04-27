import {
  Card
} from '@mui/material';

import {useSelector, useDispatch} from 'react-redux';

function FocusedPostCard(props) {
  return <Card elevation={4} className="focused-post" {...props} />;
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
      <FocusedPostCard>
        <h3 className="initial-message">Click a post on the left to view more information.</h3>
      </FocusedPostCard>
    )
  }

  const post = postPreviews[expandedPost];
  return (
    <FocusedPostCard>
      <h3 className="primary">{post.title}</h3>
      <p className="secondary">{post.details}</p>
    </FocusedPostCard>
  );
}