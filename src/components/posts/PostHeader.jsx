import React, { useState } from "react";

import threeDotsIcon from "../../assets/icons/3dots.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import timeIcon from "../../assets/icons/time.svg";

import useAuth from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";
import { getDifferenceFromNow } from "../../utils";
import usePosts from "../../hooks/usePosts";
import { actions } from "../../actions";
import { api } from "../../api";

const PostHeader = ({ post }) => {
  const [shwoAction, setShowAction] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const {dispatch} = usePosts()

  const isMe = post?.author?.id == auth?.user?.id;


  const handleDeletePost= async(e)=>{
    dispatch({ type:actions.post.DATA_FETCHING})
    try {
      const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`)

      if(response.status === 200){
        dispatch({
          type:actions.post.POST_DELETED,
          data:post.id
        })
      }
      
    } catch (error) {
      console.log(error);
      dispatch({
        type:actions.post.DATA_FETCH_ERROR,
        error:response.error
      })
      
    }
  }

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={timeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {getDifferenceFromNow(post?.createAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button onClick={() => setShowAction(!shwoAction)}>
            <img src={threeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {shwoAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button onClick={handleDeletePost} className="action-menu-item hover:text-red-500">
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default PostHeader;
