import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useReducer } from "react";
import { initialState, postReducer } from "../reducers/PostReducer";
import useAxios from "../hooks/useAxios";
import { actions } from "../actions";
import PostList from "../components/posts/PostList";
import usePosts from "../hooks/usePosts";
import NewPost from "../components/posts/NewPost";


const HomePages = () => {

  const {state, dispatch} = usePosts()

  const {api} = useAxios()

  useEffect(()=>{
    dispatch({type:actions.post.DATA_FETCHING})

    const fetchPost = async()=>{
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`)
        if(response.status === 200){
          dispatch({
            type:actions.post.DATA_FETCHED,
            data:response.data
          })
        }
        
      } catch (error) {
        console.error(error)
        dispatch({
          type:actions.post.DATA_FETCH_ERROR,
          error:error.message
        })
      }

    }
    fetchPost()


  },[])

  if(state?.loading){
    return <div>we are working...</div>
  }

  if(state?.error){
    return <div>Error is fetching posts {state?.error?.message}</div>
  }
  
  return <div>

    <NewPost/>    
    <PostList posts={state?.posts}/>
    
  </div>;
};

export default HomePages;
