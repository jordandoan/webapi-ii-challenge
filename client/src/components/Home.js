import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = (props) => {
  let [posts, setPosts] = useState();
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data));
  }, []);

  return (
    <div className="post-container">
      {posts && posts.map(post => 
        <div className="post-card">
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
          <button onClick={() => props.history.push(`/${post.id}`)}>View Comments</button>
          <button>Edit Post</button>
        </div>  
      )}
    </div>
  )
};

export default Home;