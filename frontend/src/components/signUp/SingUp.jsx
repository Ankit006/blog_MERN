import React from "react";

export default function SingUp({
  username,
  password,
  confirmPassword,
  email,
  usernameHandler,
  emailHandler,
  passwordHandler,
  confirmPasswordHandler,
  submitHandler,
  handleProfileImage,
  imageName,
  required,
  error,
}) {
  return (
    <form className="signup">
      <div>
        <p className="input_label">username</p>
        <input
          className="input_field"
          required={required}
          type="text"
          value={username}
          onChange={usernameHandler}
          placeholder="Your username"
        />
      </div>
      <div>
        <p className="input_label">Email</p>
        <input
          className="input_field"
          required={required}
          type="text"
          value={email}
          onChange={emailHandler}
          placeholder="Your Email"
        />
      </div>
      <div>
        <p className="input_label">Password</p>
        <input
          type="password"
          required={required}
          className="input_field"
          value={password}
          onChange={passwordHandler}
          placeholder="Minimum 8 characters"
        />
      </div>
      <div>
        <p className="input_label">Confirm Password</p>
        <input
          className="input_field"
          required={required}
          type="password"
          value={confirmPassword}
          onChange={confirmPasswordHandler}
          placeholder="Confirm your password"
        />
      </div>
      <p className="error">{error}</p>
      <div className="upload_container">
        <label>
          <input
            className="uploadImage"
            type="file"
            id="file"
            onChange={handleProfileImage}
          />
          <span className="upload_label">Image</span>
          <span className="image_name">{imageName}</span>
        </label>
      </div>
      <button className="submit" type="submit" onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
}
