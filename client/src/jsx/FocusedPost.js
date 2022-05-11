import {
  Card
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import {useSelector} from 'react-redux';
import CodeBlock from 'jsx/CodeBlock';

function FocusedPostContent(props) {
  return <div className="focused-post" {...props} />;
}

function FocusedPostCard(props) {
  const {className, ...otherProps} = props;
  return <Card className={`focused-post-card ${className || ''}`} elevation={8} {...otherProps} />;
}

function Markdown({children}) {
  return (
    <section>
      <ReactMarkdown components={CodeBlock}>
        {children}
      </ReactMarkdown>
    </section>
  )
}

/**
 * The expected process would be that expandedPost contains some post id
 * And then we fetch the post id
 * But I'll just use the mock data for the moment.
 */
export default function FocusedPost() {
  const {expandedPost} = useSelector((state) => state.mem);
  if (expandedPost === null) {
    return (
      <FocusedPostContent>
        <FocusedPostCard className='initial-message'>
          Click a post on the left to view more information
        </FocusedPostCard>
      </FocusedPostContent>
    )
  }

  return (
    <FocusedPostContent>
      <FocusedPostCard>
        <p className="primary">{expandedPost.post.title}</p>
        <div className="content">
          <Markdown>{expandedPost.post.body}</Markdown>
        </div>
      </FocusedPostCard>
      <FocusedPostCard>
        <p className="primary">Responses/Comments</p>
        <div className="content">
          {
            expandedPost.comments.map(({body, id}) => {
              return <Markdown key={id}>{body}</Markdown>
            })
          }
        </div>
      </FocusedPostCard>
    </FocusedPostContent>
  );
}