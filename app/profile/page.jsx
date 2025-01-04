"use client";

import { useEffect, useState } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";

import Profile from "@components/Profile";

import React from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirm = confirm("Are you sure you want to delete this prompt?");

    if(hasConfirm) {
      try {
        await fetch(`/api/prompt/${post._id}`, 
          {
            method: "DELETE"
          }
        )

        const filterPosts = posts.filter((p) => p._id !== post._id)

        setPosts(filterPosts);
      } catch (error) {
        console.log(error)
      }
    }

    
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    console.log(session?.user);

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
