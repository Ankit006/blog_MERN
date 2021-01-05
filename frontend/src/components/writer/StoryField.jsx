import React from "react";

export default function StoryField({ value, handler }) {
  return (
    <div>
      <p className="writer_label">Story</p>
      <textarea className="storyArea" value={value} onChange={handler} />
    </div>
  );
}
