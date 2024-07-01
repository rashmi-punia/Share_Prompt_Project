"use client"

import Profile from '@components/Profile'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = ({params}) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get("name")
    
    const [userPosts,setUserPosts] = useState()

    useEffect(() => {
        const fetchPosts = async() => {
            const {data} = await axios.get(`/api/users/${params?.id}/posts`)

            setUserPosts(data)
        }
        if(params?.id) fetchPosts()
    },[params.id])
  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalised profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}

export default UserProfile
