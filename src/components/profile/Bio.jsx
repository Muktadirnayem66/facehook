import React, { useState } from 'react';
import useProfile from '../../hooks/useProfile';
import useAxios from '../../hooks/useAxios';
import checkIcon from '../../assets/icons/check.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { actions } from '../../actions';

const Bio = () => {
    const {state, dispatch} = useProfile()
    const {api} = useAxios()

    const [bio, setBio] = useState(state?.user?.bio)
    const [editable, setEditable] = useState(false)

    const handleBioEdit = async ()=>{
        dispatch({type:actions.profile.DATA_FETCHING})
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`, {bio}) 

            if(response.status === 200){
                dispatch({type:actions.profile.USER_DATA_EDITED, 
                data:response.data
                })
            }

            setEditable(false)

        } catch (error) {
            dispatch({type:actions.profile.DATA_FETCH_ERROR, error:error.message})
            
        }

    }

    return (
        <div  className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!editable ? (

                <p>
                    {state?.user?.bio}
                </p>
                ) 
                
                : (
                    <textarea className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
                     value={bio} rows={4} cols={66}
                     onChange={(e)=>setBio(e.target.value)}
                     />

                )
                
                }


            </div>
            {
                !editable ? (

            <button className="flex-center h-7 w-7 rounded-full"
                    onClick={()=>setEditable(true)}
            >
                <img src={EditIcon} alt="edit icon" />
            </button>
                ) 
                
                : (

                    <button className="flex-center h-7 w-7 rounded-full" onClick={handleBioEdit}>
                <img className='text-white' src={checkIcon} alt="checkIcon icon" />
            </button>


                )
            }
            
        </div>
    );
};

export default Bio;