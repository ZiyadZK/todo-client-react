import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from 'react';
import LeftSidebar from "../Components/Home/LeftSidebar";
import { Suspense, useState } from "react";
import NotesDetailPage from "./Notes/NotesDetailPage";
import NewNotesPage from "./Notes/NewNotesPage";
import ChangeNotesPage from "./Notes/ChangeNotesPage";
import { faDeleteLeft, faFile, faFileCirclePlus, faFilePen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { connect, io } from "socket.io-client";
// import NotesList from "./Notes/NotesList";
// import NotesList from "./Notes/NotesList";
// import { NotesList } from "./Notes/NotesList";io


export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState('');
    const [detail, setDetail] = useState(null);

    const viewPage = () => {
        switch(page) {
            case 'detail':
                return <NotesDetailPage item={detail}/>;
            case 'new':
                return <NewNotesPage getNote={getNotes} />
            case 'change':
                return <ChangeNotesPage />
            default:
                return null;
        }
    }

    const deleteNote = async (notes_id) => {
        try {
            const { data } = await axios.delete(`https://todo-api-mqxn4q5g2q-as.a.run.app/api/deleteNote?notes_id=`+notes_id, {
                withCredentials: true
            });
            const response = data.result;
            // console.log(response);
            getNotes();
        } catch (error) {
            console.error(error);
        }
    }

    const getNotes = async () => {
        try {
            const { data } = await axios.get('https://todo-api-mqxn4q5g2q-as.a.run.app/api/getNote', {
                withCredentials: true
            });
            const response = data.result;
            console.log(response.result);
            setNotes(response.result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getNotes();

        const connectSocket = () => {
            try {
                const socket = io('https://todo-api-mqxn4q5g2q-as.a.run.app/');
                socket.on('connect', () => {
                    console.log(socket);
                    console.log('connected');
                    socket.on('getNote', (data) => {
                        setNotes(data);
                    });
                });
            } catch(error) {
                console.error(error);
            }
        }
        connectSocket();

    }, [])

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
                        {notes.map((items, index) => (
                            <li className="group" key={index}>
                                <div onDoubleClick={() => {setDetail(notes[index]); setPage('detail')}}  className="cursor-pointer border border-zinc-100/0 hover:border-zinc-200 w-full h-10 rounded-2xl flex items-center p-5 focus:border-zinc-700 gap-2 text-xs text-zinv-700 text-start">
                                    <div className="w-1/6 flex gap-2 items-center">
                                        <div className="w-1/6 flex justify-center items-center">
                                            <input type="checkbox" checked={items.checked} name="" id="" className="accent-green-500 outline-none cursor-pointer"/>
                                        </div>
                                        <div className="w-5/6 text-zinc-600">
                                            {items.due} <br />
                                            {/* <span className="font-bold">18:30</span> */}
                                        </div>
                                    </div>
                                    <div className="w-5/6 flex gap-2">
                                        <p className="w-5/6 truncate text-zinc-600">
                                            <b>
                                                {items.notes_name}
                                            </b> <br />
                                            {items.notes_desc}
                                        </p>
                                        <div className="w-1/6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <button type="button" onClick={() => deleteNote(items.notes_id)} className="text-red-600 flex gap-2 items-center">
                                                <FontAwesomeIcon icon={faDeleteLeft} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
            <div className="w-2/6 bg-white rounded-2xl relative overflow-hidden">
                
                {/* Add New Note + Change Note */}
                <div className="w-full p-5 h-20 flex items-center justify-center gap-5">
                    <button type="button" onClick={() => {setPage('new')}} className="w-1/2 h-full flex items-center justify-center gap-2 border rounded-2xl text-amber-100 bg-zinc-500 font-bold hover:bg-zinc-700">
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        New Notes
                    </button>
                    <button type="button" onClick={() => {setPage('change')}} className="w-1/2 h-full flex items-center justify-center gap-2 border rounded-2xl text-amber-100 bg-zinc-500 font-bold hover:bg-zinc-700">
                        <FontAwesomeIcon icon={faFilePen} />
                        Change Notes
                    </button>
                </div>
                {viewPage()}

            </div>
        </div>
    );
}
