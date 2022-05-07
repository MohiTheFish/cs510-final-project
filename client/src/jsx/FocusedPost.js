import {
  Card, Paper,
  CardHeader,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import {useSelector, useDispatch} from 'react-redux';
import CodeBlock from 'jsx/CodeBlock';

function FocusedPostContent(props) {
  return <div className="focused-post" {...props} />;
}

function FocusedPostCard(props) {
  const {className, ...otherProps} = props;
  return <Card className={`focused-post-card ${className || ''}`} elevation={4} {...otherProps} />;
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
        <p className="primary">{post.title}</p>
        <div className="content">
          <Markdown>{post.details}</Markdown>
        </div>
      </FocusedPostCard>
      <FocusedPostCard>
        <p className="primary">Responses/Comments</p>
        <div className="content">
          <Markdown>
            {"![retrain.jpg](https://campuspro-uploads.s3.us-west-2.amazonaws.com/ceebfe56-6335-45b6-9f4b-9c79220ce14a/59484e60-3c4b-49ae-8463-b028818ab8d0/retrain.jpg)  \n\n After editing **sampleseq3** (inserting a P) to \n**sampleseq4** do we have to retrain the model with **sampleseq4**?\n\nOn testing the insertion of P,\nDo we simply run:\n```bash\n./hmm -d -m sampleunsupmod3 -s sampleseq4\n```\n\nOr do we have to retrain HMM with sampleseq4?\n```\n ./hmm -t -n 2 -m sampleunsupmod4 -s sampleseq4\n./hmm -d -m sampleunsupmod4 -s sampleseq4\n```"}
          </Markdown>
        </div>
      </FocusedPostCard>
    </FocusedPostContent>
  );
}