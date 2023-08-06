import { useFetchUserQuery, useRemoveUserMutation } from "@/redux/slices/accountAdmin";
import { Link } from "react-router-dom";

const PageAdminAccount=()=>{
    const {data,isLoading,refetch }=useFetchUserQuery()
    const [removeUser]=useRemoveUserMutation()
    const handleDelete = async (_id?: string) => {
      if (_id) {
        try {
          await removeUser(_id); 
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    };
    if (isLoading) {
      return <div className="flex items-center justify-center w-screen h-screen border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
    </div>; 
  }
    return (
    <div className="relative px-6 py-8 overflow-hidden">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h1 className="text-2xl font-semibold flex items-center">
            <span className="w-1 h-6 bg-primary block mr-2"></span>
            <span>Tài khoản</span>
        </h1>
        <Link to="/admin/account/create" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Thêm mới admin
        </span>
      </Link>
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Id
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Username
        </th>
        <th scope="col" className="px-6 py-3">
          Password
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {data?.map((item,index) => <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th key={item._id} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {index+1}
        </th>
        <td className="px-6 py-4">
            {item.name}
        </td>
        <td className="px-6 py-4">
            {item.email}
        </td>
        <td className="px-6 py-4">
            {item.password}
        </td>
        <td className="px-6 py-4">
            {item.role}
        </td>
        <div>
        <button onClick={()=>handleDelete(item._id)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Xóa
            </span>
        </button>
        </div>

      </tr>)}

    </tbody>
  </table>
</div>
</div>
    )
}
export default PageAdminAccount
