import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, story, author }) {
	return (
		<div className='card'>
			<h1 className='cardTitle'>
				<Link className='link' to='/story'>
					{title}
				</Link>
			</h1>
			<div className='cardStory'>
				<p>{story}</p>
			</div>
			<h3 className='cardAuthor'>{author}</h3>
		</div>
	);
}
