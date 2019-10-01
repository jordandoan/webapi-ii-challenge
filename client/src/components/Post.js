import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = (props) => {
  let [post, setPost] = useState();
  let [comments, setComments] = useState();
  let id = props.match.params.id;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data[0]));
    axios.get(`http://localhost:5000/api/posts/${id}/comments`)
      .then(res => setComments(res.data));
  }, [id]);

  return (
    <div>
      hi
      {post && 
      <div>
        <h2>{post.title}</h2>
        <p>{post.contents}</p>
      </div>}
      {comments && 
      <div>
        {comments.map(comment =>
          <div>
            <p>{comment.text}</p>
            <p>{comment.created_at}</p>
          </div>
        )}
      </div>
      }
    </div>
  )
}

export default Post;