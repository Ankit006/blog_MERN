import React from "react";

export default function Story({ title, imageLink, author, story }) {
	return (
		<div>
			<h1>{title}</h1>
			<img src={imageLink} alt='senary' />
			<p>{story}</p>
			<h3>{author}</h3>
		</div>
	);
}
