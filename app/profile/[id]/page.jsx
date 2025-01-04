"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@node_modules/next/navigation";
import { useSearchParams } from "@node_modules/next/navigation";

import Profile from "@components/Profile";

import React from "react";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState([]);

 

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${(await params).id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

      fetchPosts();

  }, []);

  return (
    <Profile
      name={ searchParams.get("name")}
      desc={`Welcome to ${searchParams.get("name")} personalized profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
