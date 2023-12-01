import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeftSidebar from "../Components/Home/LeftSidebar";
import { faCalendar, faCircleCheck, faClock, faDeleteLeft, faDotCircle, faFileCirclePlus, faFilePen } from "@fortawesome/free-solid-svg-icons";

export default function NotesPage() {

    return (
        <div className="w-full h-screen flex p-5 gap-5 bg-zinc-50 font-nunito ">
            <LeftSidebar w="1/6" />
            {/* Main Content */}
            <div className="w-3/6 rounded-2xl bg-white p-5 space-y-5 h-full relative overflow-hidden">
                <img src="/logo.png" alt="" className="absolute bottom-0 right-0 opacity-5 translate-x-24 translate-y-20 rotate-[-30deg]" />
                <img src="/logo.png" alt="" className="absolute top-0 left-0 opacity-5 w-20 h-20 rotate-[30deg] translate-y-40 -translate-x-5"/>
                {/* Search Bar, Filters */}
                <div className="w-full h-10 flex items-center justify-between">
                    <div className="relative w-2/3">
                        <input type="text" className="peer w-full rounded-2xl border border-zinc-700 outline-none h-10 px-5 text-zinc-700 focus:border-violet-600 transition-all duration-150"/>
                        <p className="absolute top-0 left-0 translate-x-3 -translate-y-2.5 w-fit px-2 bg-white font-bold text-zinc-700 peer-focus:text-violet-600 text-sm transition-all duration-500">
                            Search your note here
                        </p>
                    </div>
                    <div className="relative ">
                        <select name="" id="" className="peer pr-10 rounded-2xl border border-zinc-500 h-10 pl-2 text-sm text-zinc-700 font-bold outline-none cursor-pointer hover:border-violet-300 hover:text-violet-700">
                            <option value="">Name</option>
                            <option value="">ID</option>
                        </select>
                        <p className="absolute top-0 left-0 translate-x-3 -translate-y-2.5 w-fit px-2 bg-white font-bold text-zinc-700 peer-hover:text-violet-600 text-sm transition-all duration-500">
                            Search by
                        </p>
                    </div>
                </div>
                {/* Lists Note */}
                <div className="w-full h-full max-h-[555px] relative overflow-auto scrollbar">
                    <ul className="">
                        
                        <li className="group">
                            <button type="button" className="border border-zinc-100/0 hover:border-zinc-200 w-full h-10 rounded-2xl flex items-center p-5 focus:border-zinc-700 gap-2 text-xs text-zinv-700 text-start">
                                <div className="w-1/6 flex gap-2 items-center">
                                    <div className="w-1/6 flex justify-center items-center">
                                        <input type="checkbox" name="" id="" className="accent-green-500 outline-none cursor-pointer"/>
                                    </div>
                                    <div className="w-5/6 text-zinc-600">
                                        20-11-2023 <br />
                                        <span className="font-bold">18:30</span>
                                    </div>
                                </div>
                                <div className="w-5/6 flex gap-2">
                                    <p className="w-5/6 truncate text-zinc-600">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In, tempora. Ducimus optio dolorem asperiores nihil, voluptates numquam pariatur perspiciatis veritatis, quis illo animi consequatur laborum ex? Quisquam temporibus quaerat rerum!
                                    </p>
                                    <div className="w-1/6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="text-red-600 flex gap-2 items-center">
                                            <FontAwesomeIcon icon={faDeleteLeft} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="w-2/6 bg-white rounded-2xl relative overflow-hidden">
                
                {/* Add New Note + Change Note */}
                <div className="w-full p-5 h-20 flex items-center justify-center gap-5">
                    <button type="button" className="w-1/2 h-full flex items-center justify-center gap-2 border rounded-2xl text-amber-100 bg-zinc-500 font-bold hover:bg-zinc-700">
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        New Notes
                    </button>
                    <button type="button" className="w-1/2 h-full flex items-center justify-center gap-2 border rounded-2xl text-amber-100 bg-zinc-500 font-bold hover:bg-zinc-700">
                        <FontAwesomeIcon icon={faFilePen} />
                        Change Notes
                    </button>
                </div>
                <div className="w-full p-5 h-full max-h-[555px]">
                    <h1 className="font-bold w-fit text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-amber-500 text-2xl">
                        Notes Details
                    </h1> 
                    <hr className="w-full my-2" />
                    <p className="italic text-zinc-400 tracking-tighter text-sm">
                        Click one of your notes on the left to see details of it.
                    </p>
                    <hr className="my-2 opacity-0" />
                    <div className="flex items-center gap-5 text-sm text-zinc-600 font-bold">
                        <FontAwesomeIcon icon={faDotCircle} />
                        <input type="text" value="Notes_1k2j3h1kj23h" className="outline-none" readOnly/>
                    </div>
                    <p className="flex items-center gap-5 text-sm text-zinc-600">
                        <FontAwesomeIcon icon={faCalendar} />
                        30-11-2023 <span className="font-bold">05:00 PM</span>
                        <span className="text-green-500 ">
                            <FontAwesomeIcon icon={faCircleCheck} /> Checked
                        </span>
                        <span className="text-orange-500 ">
                            <FontAwesomeIcon icon={faClock} /> Pending
                        </span>
                    </p>
                    <hr className="my-3 opacity-0" />
                    <div className="flex gap-5">
                        <p className="w-1/6 font-bold text-zinc-700">
                            Title
                        </p>
                        <div className="w-5/6 text-zinc-700">
                            Jokiin Mobile Legends sama Temen-temen
                        </div>
                    </div>
                    <hr className="my-2 opacity-0" />
                    <div className="flex gap-5">
                        <p className="w-1/6 font-bold text-zinc-700">
                            Description
                        </p>
                        <div className="w-5/6 text-zinc-700">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora odit cupiditate harum necessitatibus minus praesentium eos qui, doloremque quae quisquam in ad pariatur modi reprehenderit provident eligendi, quis natus eaque.

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
