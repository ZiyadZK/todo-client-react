import { useCookies } from "react-cookie";
import LeftSidebar from "../Components/Home/LeftSidebar";
import { Navigate } from "react-router";

const HomePage = () => {

    const [cookies, setCookie, removeCookie ] = useCookies(['token']);

    if(!cookies.token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="w-full h-screen flex p-5 gap-5 bg-zinc-50">
            <LeftSidebar w="1/6"></LeftSidebar>
            <div className="w-full rounded-2xl bg-white"></div>
            
        </div>
    );
}

export default HomePage;