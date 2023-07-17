import { Outlet } from "react-router-dom"

const ClientLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}

export default ClientLayout