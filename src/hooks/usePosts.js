import React, { useContext } from 'react';
import { PostContext } from '../context';

const usePosts = () => {
    return useContext(PostContext)
};

export default usePosts;