import { deleteCookie } from './utils';
  
  const Logout = () => {
    const handleLogout = () => {
      // Xoá cookie có tên 'token'
      deleteCookie('token');
      window.location.href = '/login';
    };
  
    return (
      <div>
        <h1>Bạn có chắc chắn muốn đăng xuất?</h1>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    );
  };
  
  export default Logout;
  