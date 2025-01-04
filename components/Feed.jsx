"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResult, setSearchedResult] = useState([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); //i for case insensitive
    
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    // clear timeout will clear or reset timer every event changes
    const keyword = e.target.value;

    setSearchText(keyword);

    //debounce method
    setSearchTimeout(
      // setTimeout give ID timer value in number, save it (ID) in searchTimeOut
      // and then clearTimeout will reset the time by ID that save it in searchTimeout state
      // setTimeout will execute code after delay time in millis
      setTimeout(() => {
        const searchResult = filterPrompts(keyword);
        setSearchedResult(searchResult)
      }, 250)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag);
    setSearchedResult(searchResult)
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search form a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
        {
       
        }
      </form>

     { searchText ? (
       <PromptCardList data={searchedResult} handleTagClick={handleTagClick} />
     ) : (
      <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
     )}
    </section>
  );
};

export default Feed;
