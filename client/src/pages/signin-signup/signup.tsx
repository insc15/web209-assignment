import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import ApiResponse from '@/interfaces/ApiResponse';
import { register } from '@/services/account';
import { useLoginUserMutation } from '@/redux/slices/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name:"",
  email:"",
  password:"",
  confirmPassword: ""
}
const Signup = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {name, email, password,confirmPassword} = formValue;
  const [showRegister,setShowRegister] = useState(false);
  const navigate=useNavigate();
  const [loginUser,
    {
      data:loginData,
      isSuccess:isLoginSuccess,
      isError:isLoginError,
      error:loginError
    }
  ] =useLoginUserMutation();

const handleChange=(e:any) => {
  setFormValue({...formValue,[e.target.name]:e.target.value});
}
const handleLogin =async()=>{
  if (email&&password) {
    await loginUser({
      email,password
    }) 
  }else{
    toast.error("Vui lòng điền vào trường dữ liệu còn thiếu")
  }
}
useEffect(() =>{
  if (isLoginSuccess) {
    toast.success("Đăng nhập thành công")
    navigate("/")
  }
},[isLoginSuccess])
  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Đăng ký tài khoản</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md" />
          <div className="px-8 py-6">
            <label className="block font-semibold">Tên</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleChange}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Mật khẩu</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Nhập lại Mật khẩu</label>
            <input
              type="password"
              placeholder="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <div className="flex justify-between items-baseline">
              <button
                type="button"
                onClick={()=>handleLogin()}
                className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
              >
                Đăng ký
              </button>
              <a href="#" className="text-sm hover:underline">
                Quên mật khẩu?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
