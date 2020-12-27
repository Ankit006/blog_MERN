import React from "react";

export default function AuthorField({ value, handler }) {
	return (
		<div>
			<input type='text' value={value} onChange={handler} />
		</div>
	);
}
