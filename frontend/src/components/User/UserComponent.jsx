// userComponent.jsx

import React from 'react';

const UserComponent = ({ user }) => {
  const { name, imgSrc, bio, links, works, details } = user;

  return (
    <div className="user-background">
      <div className="user-info">
        <div className="user-profile">
          <img className="user-img" src={imgSrc} alt={`${name}'s Profile`} />
        </div>
        <div className="user-links">{links}</div>
      </div>
      <div className="user-bio">{bio}</div>
      <div className="user-details">{details}</div>
      <div className="user-works">{works}</div>
    </div>
  );
};

export default UserComponent;
