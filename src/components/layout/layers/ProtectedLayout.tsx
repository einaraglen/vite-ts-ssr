import { Outlet } from "react-router-dom";
import SideNavigation from "../SideNavigation";

const ProtectedLayout = () => {
    return (
        <main className="flex">
            <SideNavigation />
            <Outlet />
        </main>
    )
}

export default ProtectedLayout;