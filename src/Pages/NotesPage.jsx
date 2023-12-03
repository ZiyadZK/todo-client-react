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
import Swal from "sweetalert2";
// import NotesList from "./Notes/NotesList";
// import NotesList from "./Notes/NotesList";
// import { NotesList } from "./Notes/NotesList";io


export default function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState('');
    const [index, setIndex] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [checkedOnly, setCheckedOnly] = useState(false);

    

    const viewPage = () => {
        switch(page) {
            case 'detail':
                return <NotesDetailPage index={index} notes={notes}/>;
            case 'new':
                return <NewNotesPage getNote={getNotes} />
            case 'change':
                return <ChangeNotesPage index={index} notes={notes} />
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
                    // console.log(socket);
                    // console.log('connected');
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

    
    const SubmitChecked = async (checked, notes_id) => {
        // alert(notes_id);
        try {
            const dataBody = {
                checked: checked === true ? 1 : 0
            }
            const { data } = await axios.put('https://todo-api-mqxn4q5g2q-as.a.run.app/api/updateNoteChecked?notes_id='+notes_id, dataBody, {
                withCredentials: true
            });
            getNotes();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                timer: 2000,
                showConfirmButton: false
            })
        }
    }

    const NotesList = (items) => {
        // console.log(checked)
        return (
            <ul className="">
                {items.map((item, index) => (
                    <li className="group" key={index} onDoubleClick={() => {setIndex(index); setPage('change')}}>
                        <div  className="cursor-pointer border border-zinc-100/0 hover:border-zinc-200 w-full h-10 rounded-2xl flex items-center p-5 focus:border-zinc-700 gap-2 text-xs text-zinc-700 text-start">
                            <div className="w-1/6 flex gap-2 items-center">
                                <div className="w-1/6 flex justify-center items-center">
                                    <input type="checkbox" checked={item.checked} onChange={(e) => {SubmitChecked(!item.checked, item.notes_id); setIndex(index)}} name="" id="" className="accent-green-500 outline-none cursor-pointer"/>
                                </div>
                                <div className="w-5/6 text-zinc-600">
                                    {item.due} <br />
                                </div>
                            </div>
                            <div className="w-5/6 flex gap-2">
                                <p className="w-5/6 truncate text-zinc-600">
                                    <b>
                                        {item.notes_name}
                                    </b> <br />
                                    {item.notes_desc}

                                </p>
                                <div className="w-1/6 flex gap-5 items-center justify-center">
                                    <button onClick={() => { setIndex(index); setPage('detail')}}  className="flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <FontAwesomeIcon icon={faFile} className="text-zinc-600 group-hover:text-zinc-700 transition-all duration-150 cursor-pointer"/>
                                    </button>
                                    <button className="flex items-center justify-center opacity-0 group-hover:opacity-100 " onClick={() => deleteNote(item.notes_id)}>
                                        <FontAwesomeIcon  icon={faDeleteLeft} className="text-zinc-600 group-hover:text-zinc-700 transition-all duration-150 cursor-pointer"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    const viewNotes = () => {
        if(checkedOnly === true) {
            const filteredNotes = notes.filter(item => item.checked === true);
            if(filteredNotes.length === 0) {
                return (
                    <div className="flex w-full items-center justify-center h-10">
                        <h1 className="font-nunito font-bold text-zinc-300 text-sm">
                            There's no checked note
                        </h1>
                    </div>
                )
            }
            return (
                <div className="w-full h-full max-h-[555px] relative overflow-auto scrollbar">
                    <ul className="">
                        {NotesList(filteredNotes)}
                    </ul>
                </div>
            )
        }
        if (searchValue !== '') {
            const filteredNotes = notes.filter(item => item.notes_name.toLowerCase().includes(searchValue.toLowerCase()));
            if(filteredNotes.length === 0) {
                return (
                    <div className="flex w-full items-center justify-center h-10">
                        <h1 className="font-nunito font-bold text-zinc-300 text-sm">
                            There's no note with that value
                        </h1>
                    </div>
                )
            }
            return (
                <div className="w-full h-full max-h-[555px] relative overflow-auto scrollbar">
                    <ul className="">
                        {NotesList(filteredNotes)}
                    </ul>
                </div>
            )
        }else{
            if(notes.length === 0) {
                return (
                    <div className="flex w-full items-center justify-center h-10">
                        <h1 className="font-nunito font-bold text-zinc-300 text-sm">
                            There's no note yet
                        </h1>
                    </div>
                )
            }
            return (
                <div className="w-full h-full max-h-[555px] relative overflow-auto scrollbar">
                    <ul className="">
                        {NotesList(notes)}
                    </ul>
                </div>
            )
        }
    }

    
    return (
        <div className="w-full h-screen flex p-5 gap-5 bg-zinc-50 font-nunito ">
            <LeftSidebar w="1/6" />
            {/* Main Content */}
            <div className="w-3/6 rounded-2xl bg-white p-5 space-y-5 h-full relative overflow-hidden">
                <img src="/logo.png" alt="" className="absolute bottom-0 left-0 opacity-5 -translate-x-24 translate-y-20 rotate-[30deg]" />
                <img src="/logo.png" alt="" className="absolute top-0 right-0 opacity-5 w-20 h-20 rotate-[-30deg] translate-y-40 translate-x-5"/>
                {/* Search Bar, Filters */}
                <div className="w-full h-10 flex items-center justify-between">
                    <div className="relative w-2/3">
                        <input type="text" onChange={e => setSearchValue(e.target.value)} className="peer w-full rounded-2xl border border-zinc-700 outline-none h-10 px-5 text-zinc-700 focus:border-violet-600 transition-all duration-150"/>
                        <p className="absolute top-0 left-0 translate-x-3 -translate-y-2.5 w-fit px-2 bg-white font-bold text-zinc-700 peer-focus:text-violet-600 text-sm transition-all duration-500">
                            Search your note here
                        </p>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                        <button onClick={() => setCheckedOnly((state) => !state)} className={checkedOnly ? `bg-zinc-700 text-white text-sm border rounded-2xl p-2 px-2 font-bold transition-all duration-300` : `text-zinc-700 text-sm border rounded-2xl p-2 px-2 duration-300`}>
                            View checked list
                        </button>
                        <div className="flex justify-center items-center w-full z-50">
                            { checkedOnly ? (
                                <button type="button" className="font-nunito hover:text-zinc-700 transition-all duration-300 font-bold text-zinc-500 text-xs focus:text-red-700 cursor-pointer">
                                    Clear all checked list
                                </button>
                            ) : ""}
                            
                        </div>
                    </div>
                </div>
                {/* Lists Note */}
                { viewNotes() }
                
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
                { viewPage() }

            </div>
        </div>
    );
}
