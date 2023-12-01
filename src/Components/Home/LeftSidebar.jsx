import * as fas from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function LeftSidebar ({ w }) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const userSignOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You need to log in if you come here again :)",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if(result.isConfirmed) {
                removeCookie('token');
                return <Navigate to="/login" />
            }
        });
    }
    
    const links = [
        { link: '/', text: 'Home', logo: fas.faHouse},
        { link: '/about', text: 'About', logo: fas.faBook},
        { link: '/notes', text: 'Your Notes', logo: fas.faNoteSticky}
    ]

    const location = useLocation();

    return (
        <div className={`font-nunito p-5 w-` + w}>
            <div className="flex gap-3 items-center justify-center w-full">
                <img src="/logo.png" alt="" className="w-1/4" />
                <article className="font-bold text-zinc-700 text-2xl">
                    Todo <br />
                    Application
                </article>
            </div>
            <hr className="my-5 w-full"/>
            <ul className="">
                { links.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} className="flex justify-between items-center p-2 pl-3 rounded-2xl hover:bg-violet-600 group transition-all duration-300">
                            <p className='w-fit flex gap-3 items-center text-zinc-500 group-hover:text-violet-100 font-bold text-sm transition-all duration-300'>
                                <FontAwesomeIcon icon={item.logo}></FontAwesomeIcon>
                                {item.text}
                            </p>
                            { location.pathname === item.link ? 
                                <span className='bg-violet-600 p-0.5 rounded-full'></span>
                            : "" }
                        </a> 
                    </li>
                )) }
                <li>
                    <button onClick={userSignOut} type="button" className='flex justify-between items-center p-2 pl-3 rounded-2xl hover:bg-red-600 group transition-all duration-300 w-full'>
                        <p className='w-fit flex gap-3 items-center text-zinc-500 group-hover:text-violet-100 font-bold text-sm transition-all duration-300'>
                            <FontAwesomeIcon icon={fas.faRightFromBracket} />
                            Sign Out
                        </p>
                    </button>
                </li>
            </ul>
        </div>
    )
}