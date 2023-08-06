import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('userName');
    toast.success('Đăng xuất thành công');
    
  };

  return (
    <button className="text-primary hover:underline" onClick={handleLogout}>
      Đăng xuất
    </button>
  );
};

export default Logout;
