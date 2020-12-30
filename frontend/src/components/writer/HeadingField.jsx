import React from "react";

export default function HeadingField({ value, handler }) {
	return (
		<div>
			<input type='text' value={value} onChange={handler} />
		</div>
	);
}
