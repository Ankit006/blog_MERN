import stories from "../story";
import Story from "../components/story/story";
import React from "react";

export default function StoryScreen() {
	return (
		<div>
			<Story
				author={stories[0].author}
				title={stories[0].title}
				story={stories[0].story}
				imageLink={
					"https://images.unsplash.com/photo-1596526131158-52be64dcc208?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
				}
			/>
		</div>
	);
}
