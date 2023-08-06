import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '@/redux/slices/authApi';


const initialState = {
  email:"",
  password:"",
}
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {email, password} = formValue;
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
    });
  }else{
    toast.error("Vui lòng điền vào trường dữ liệu còn thiếu")
  }
}
useEffect(() => {
  if (isLoginSuccess) {
    toast.success("Đăng nhập thành công");

    // Lấy giá trị "name" từ response và lưu vào localStorage
    const userName = loginData?.user?.name;
    if (userName) {
      localStorage.setItem('userName', userName);
    }

    navigate("/");
  }
}, [isLoginSuccess, loginData]);
useEffect(() => {
  const storedUsername = localStorage.getItem('userName');
  if (storedUsername) {
    navigate('/');
  }
}, [navigate]);


  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative py-3 sm:w-96 mx-auto text-center">
        <span className="text-2xl font-light">Đăng nhập tài khoản</span>
        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
          <div className="h-2 bg-purple-400 rounded-t-md" />
          <div className="px-8 py-6">
          <label className="block mt-3 font-semibold">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              name="email" 
              onChange={handleChange}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <label className="block mt-3 font-semibold">Mật khẩu</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
            />
            <div className="flex justify-between items-baseline">
              <button
                type="button"
                onClick={()=>handleLogin()}
                className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
              >
                Login
              </button>
              <Link to="/register" className="text-sm hover:underline">
                Chưa có tài khoản?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;