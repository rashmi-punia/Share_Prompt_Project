"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import axios from "axios";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/users/${session?.user.id}/posts`);

      setPosts(data);
    };
    if (session?.user.id) {
      fetchPost();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?') 
    if(hasConfirmed){
      try {
        await axios.delete(`/api/prompt/${post._id.toString()}`)
  
        const filteredPosts = posts.filter((p)=> p._id !== post._id)
        setPosts(filteredPosts)
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="my"
      desc="Welcome!  "
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
