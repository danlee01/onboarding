import React from 'react';

// Suppressed PropTypes in ESLint with comment
/* eslint react/prop-types: 0 */
const Post = function ({ body, author }) {
  return (
    <div className="Post">
      <p className="author">
        {author}
      </p>
      <p className="body">
        {body}
      </p>
    </div>
  );
};

export default Post;
