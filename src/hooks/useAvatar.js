import useProfile from "./useProfile"


export const useAvatar = (post)=>{
    const {state} = useProfile()

    const itsMe = post?.user?.id === state?.user?.id;
    const avatar = itsMe? `${state?.user?.avatar}` : `${post?.author?.avatar}`

    const avatarURL = `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`;
    return {avatarURL}
}