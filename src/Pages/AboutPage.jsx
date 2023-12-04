import LeftSidebar from "../Components/Home/LeftSidebar";

// import { useEffect } from "react";


const AboutPage = (props) => {
    return (
        <div className="w-full h-screen flex p-5 gap-5 bg-zinc-50 font-nunito">
            <LeftSidebar w="1/6" />
            <div className="w-full rounded-2xl bg-white p-5">
                <h1 className="font-bold text-zinc-700 text-2xl">
                    About
                </h1>
            </div>
        </div>
    );
}


export default AboutPage;
