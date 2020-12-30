import React from "react";

export default function StoryField({ value, handler }) {
	return (
		<div>
			<textarea value={value} onChange={handler} />
		</div>
	);
}
