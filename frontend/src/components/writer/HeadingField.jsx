import React from "react";

export default function HeadingField({ value, handler }) {
  return (
    <div>
      <p className="writer_label">Heading</p>
      <input
        className="heading_field"
        type="text"
        value={value}
        onChange={handler}
      />
    </div>
  );
}
