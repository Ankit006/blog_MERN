import React from "react";

export default function HeadingField({ value, handler }) {
  return (
    <div>
      <p className="input_label">Heading</p>
      <input
        className="input_field"
        type="text"
        value={value}
        onChange={handler}
      />
    </div>
  );
}
