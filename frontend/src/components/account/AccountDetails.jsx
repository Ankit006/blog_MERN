import React from "react";

export default function AccountDetails({
  username,
  email,
  profileImage,
  deleteAccount,
}) {
  return (
    <div className="account_screen">
      <img src={profileImage} className="account_image" alt="profileImage" />
      <div>
        <p className="account_label">Username:</p>
        <p className="account_data">{username}</p>
      </div>
      <div>
        <p className="account_label">Email:</p>
        <p className="account_data">{email}</p>
      </div>
      <button className="delete_account" type="submit" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  );
}
