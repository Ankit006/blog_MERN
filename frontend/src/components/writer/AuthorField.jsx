import React from "react";

export default function AuthorField({ value, handler }) {
  return (
    <div>
      <p className="input_label">Author</p>
      <input
        className="input_field"
        type="text"
        value={value}
        onChange={handler}
      />
    </div>
  );
}
