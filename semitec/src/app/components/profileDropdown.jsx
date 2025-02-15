import { useState } from 'react';

const ProfileDropdown = ({ isOpen, children }) => {

  return (
    <div>
      {isOpen && (  
        children
      )}
    </div>
  );
}

export default ProfileDropdown;