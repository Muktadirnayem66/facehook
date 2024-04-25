import React from 'react';
import PostCard from './PostCard';

const PostList = ({posts}) => {
    return (
        <div>
            {
                !!posts && posts.map((post)=>(<PostCard key={post.id} post={post}/>))
            }
            
        </div>
    );
};

export default PostList;