import React from "react";

export default function AuthorField({ value, handler }) {
  return (
    <div>
      <p className="writer_label">Author</p>
      <input
        className="author_field"
        type="text"
        value={value}
        onChange={handler}
      />
    </div>
  );
}
