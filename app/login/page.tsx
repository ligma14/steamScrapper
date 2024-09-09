import React from 'react';

const SteamLoginButton: React.FC = () => {
  return (
    <a href="/api/auth/steam" className="btn btn-primary">
      Login with Steam
    </a>
  );
};

export default SteamLoginButton;