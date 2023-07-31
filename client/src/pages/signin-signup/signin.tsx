import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import ApiResponse from '@/interfaces/ApiResponse';
import { login } from '@/services/account';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      const { message, accessToken, user } = response.data as ApiResponse;
      console.log(message);
      console.log(accessToken);
      console.log(user);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error(axiosError.response?.data.message || 'Lỗi không xác định');
    }
  };
  const handleLoginClick = () => {
    handleLogin()
      .then(() => {
        // Handle success (optional)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Đăng nhập tài khoản</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md" />
          <div className="px-8 py-6">
            <label className="block font-semibold">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Mật khẩu</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <div className="flex justify-between items-baseline">
              <button
                type="button"
                onClick={handleLoginClick}
                className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
              >
                Login
              </button>
              <a href="#" className="text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
