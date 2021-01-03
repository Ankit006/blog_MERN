import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, story, author, storyId }) {
  return (
    <div className="card">
      <Link className="link" to={`/story/${storyId}`}>
        <h1 className="cardTitle">{title}</h1>
      </Link>
      <div className="cardStory">
        <p>{story}</p>
      </div>
      <h3 className="cardAuthor">{author}</h3>
    </div>
  );
}
