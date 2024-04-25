import React from "react";
import useAuth from "../../hooks/useAuth";

import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import addPhoto from "../../assets/icons/addPhoto.svg";
import useAxios from "../../hooks/useAxios";
import usePosts from "../../hooks/usePosts";
import useProfile from "../../hooks/useProfile";
import Field from "../common/Field";

const PostEntry = ({ onCreate }) => {
  const { auth } = useAuth();
  const { dispatch } = usePosts();
  const { api } = useAxios();
  const { state: profile } = useProfile();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const user = profile?.user ?? auth?.user;

  const onPostSubmit = async (formData) => {
    console.log(formData);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        { formData }
      );
      if (response.status === 200) {
        dispatch({ type: actions.post.POST_CREATED, data: response.data });
        onCreate();
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>
      <form onSubmit={handleSubmit(onPostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}{" "}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            for="photo"
          >
            <img src={addPhoto} alt="Add Photo" />
            Add Photo
          </label>
          <input type="file" name="photo" id="photo" className="hidden" />
        </div>

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text is mendatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostEntry;
