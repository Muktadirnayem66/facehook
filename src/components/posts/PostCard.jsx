import React from 'react';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostAction from './PostAction';
import PostComments from './PostComments';

const PostCard = ({post}) => {
    return (
        <div>
            <article className="card mt-6 lg:mt-8">

            <PostHeader post={post}/>
            <PostBody poster={post?.image} content={post?.content}/>
            <PostAction post={post} commentCount={post?.comments?.length}/>
            <PostComments post={post}/>

            </article>
            
        </div>
    );
};

export default PostCard;