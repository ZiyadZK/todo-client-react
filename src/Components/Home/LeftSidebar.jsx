import * as fas from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function LeftSidebar ({ w }) {
    
    const links = [
        { link: '/', text: 'Home', logo: fas.faHouse},
        { link: '/about', text: 'About', logo: fas.faBook},
        { link: '/notes', text: 'Your Notes', logo: fas.faNoteSticky},
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
                {links.map((item) => (
                    <li>
                        <a href={item.link} className="flex justify-between items-center p-2 rounded-2xl hover:bg-violet-50">
                            <p className='w-fit flex gap-2 items-center text-zinc-500 font-bold text-sm'>
                                <FontAwesomeIcon icon={item.logo}></FontAwesomeIcon>
                                {item.text}
                            </p>
                            {location.pathname == item.link ? 
                                <span className='bg-violet-600 p-0.5 rounded-full'></span>
                            : ""}
                        </a> 
                    </li>
                ))}
            </ul>
        </div>
    )
}