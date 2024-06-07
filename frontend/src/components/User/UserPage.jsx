import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserPageTemplate from './UserPageTemplate.jsx'

function UserPage() {

    const username = useParams().username;
    const [user,setUser] = useState();
    const fetchUserInfo = async()=>{
        try {
            const response = await fetch(`/api/user/${username}`, { method: "GET" });
            if(response.ok)
            {
                const res = await response.json();
                setUser(res.data);
            }
            else{
                toast.error("User does not exist",{
                    position:toast.POSITION.BOTTOM_LEFT
                })
            }
        } catch (error) {
            console.error("Something went wrong :",error);
        }
    }
    useEffect(()=>{
        fetchUserInfo();
    },[username])
    if(user)
    {
        console.log(user);
        return (          
            <>
                <UserPageTemplate User={user} usernameFetched={username}/>
            </>
          )
    }
}

export default UserPage