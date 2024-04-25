import React, { useRef } from 'react';
import useProfile from '../../hooks/useProfile';
import useAxios from '../../hooks/useAxios';
import editIcon from '../../assets/icons/edit.svg'
import { actions } from '../../actions';

const ProfileImage = () => {
    const {api} = useAxios()
    const {state, dispatch} = useProfile()
    const fileUplaodRef = useRef();

    const handleImageUpload =(e)=>{
        e.preventDefault()
        fileUplaodRef.current.addEventListener("change", updateImageDisplay)
        fileUplaodRef.current.click()
    }

    const updateImageDisplay = async ()=>{

        try {
            
            const formData = new FormData();
            for(const file of fileUplaodRef.current.files){
                formData.append("avatar", file)
            }
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`, formData)

            if(response.status === 200){
                dispatch({
                    type:actions.profile.IMAGE_UPDATED,
                    data:response.data
                })
            }
        } catch (error) {

            dispatch({
                type:actions.profile.DATA_FETCH_ERROR,
                message:error.message
            })
            
        }

    }

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">

            <img  className="max-w-full rounded-full h-40" src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`} alt={`${state?.user?.firstName}`} />

            <form>

                <button className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80" type='submit' onClick={handleImageUpload}>
                    <img src={editIcon} alt="edit icon" />
                </button>
                <input type="file" id='file' ref={fileUplaodRef} hidden />
            </form>
            
        </div>
    );
};

export default ProfileImage;