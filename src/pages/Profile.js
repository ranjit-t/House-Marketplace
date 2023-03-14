import React from "react";

export default function Profile({ user }) {
  return (
    <div className="all-parent">
      <h1>Profile</h1>
      {user && <div>Hello, {user.displayName}!</div>}
    </div>
  );
}
