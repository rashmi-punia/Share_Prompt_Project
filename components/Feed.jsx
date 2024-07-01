"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import axios from "axios";

const PromptCardList = ({ data, handleTagClicked }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClicked={handleTagClicked}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  //search states

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResutls] = useState([]);

  const fetchPost = async () => {
    const { data } = await axios.get("/api/prompt");

    setPosts(data);
  };
  
  useEffect(() => {
    fetchPost();
  }, []);

  const filteredPrompts= (searchtext)=>{
    const regex = new RegExp(searchtext, "i") //'i' flag for case-insensitive search
    return posts.filter((item)=> 
      regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt)
    )

  }

  console.log(searchResults);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

//debounce to delay this func execution after typing
setSearchTimeout(
  setTimeout(() => {
    const searchResult = filteredPrompts(e.target.value)

setSearchResutls(searchResult)  },500)
)
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filteredPrompts(tagName)
    setSearchResutls(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Seach for a tag or a userName"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer "
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClicked={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClicked={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
