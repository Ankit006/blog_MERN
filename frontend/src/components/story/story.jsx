import React from "react";

export default function Story({ title, imageLink, author, story }) {
  return (
    <div className="storyPage">
      <h1>{title}</h1>
      <p className="author">{author}</p>
      <img src={imageLink} alt="senary" />
      <p className="story">{story}</p>
    </div>
  );
}
