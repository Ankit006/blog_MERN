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
  confirmPasswordError,
  handleProfileImage,
  error,
}) {
  return (
    <form>
      <p>username</p>
      <input type="text" value={username} onChange={usernameHandler} />
      <p>Email</p>
      <input type="text" value={email} onChange={emailHandler} />
      <p>Password</p>
      <input type="password" value={password} onChange={passwordHandler} />
      <p>Confirm Password</p>
      <input
        type="password"
        value={confirmPassword}
        onChange={confirmPasswordHandler}
      />
      <input type="file" id="file" onChange={handleProfileImage} />
      <p>{confirmPasswordError}</p>
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
    </form>
  );
}
