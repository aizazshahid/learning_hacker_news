import React from 'react';
import Comment from './comment';

const CommentList = ({ comments }) => (
    <React.Fragment>
        {comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
        ))}
    </React.Fragment>
);

export default CommentList;