import React from "react";

export default function UploadImage({ handleImage, imageName }) {
  return (
    <div className="upload_container">
      <label>
        <input type="file" className="uploadImage" onChange={handleImage} />
        <span className="upload_label">Image</span>
        <span className="image_name">{imageName}</span>
      </label>
    </div>
  );
}
