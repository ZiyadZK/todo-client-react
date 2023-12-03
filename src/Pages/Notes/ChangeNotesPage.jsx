import axios from "axios";
import { useState } from "react";
import React from 'react';
import Swal from "sweetalert2";



export default function ChangeNotesPage ({ index, notes }) {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    // SUBMIT DATE
    const [showDateInd, setShowDateInd] = useState('');
    const submitDate = (e) => {
        const recentDate = new Date();
        if(e.target.value < recentDate.toISOString().split('T')[0]) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Date",
                text: "Please, choose a valid date",
                timer: 2000,
                showConfirmButton: false,
                allowOutsideClick: false
            });
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + 1);
            const newDateString = newDate.toISOString().split('T')[0];
            e.target.value = newDateString;
        };
        const chosenDate = new Date(item.due);
        setShowDateInd(chosenDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        setDueDate(e.target.value);
    }

    const ChangeSubmit = async (e) => {
        e.preventDefault();
        if(!title || !description || !dueDate) {
            return Swal.fire({
                icon: "warning",
                title: "Change Notes Failed",
                text: "Please, fill the form to change notes",
                timer: 2000,
                showConfirmButton: false,
                allowOutsideClick: false
            });
        }
        const newNotes = {
            checked: false,
            notes_name: title,
            notes_desc: description,
            due: dueDate
        };
        try {
            await axios.put('https://todo-api-mqxn4q5g2q-as.a.run.app/api/updateNote?notes_id='+item.notes_id, newNotes, {
                withCredentials: true
            }).then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Change Notes Success",
                    text: "Your notes has been changed",
                    timer: 2000,
                    showConfirmButton: false,
                    allowOutsideClick: false
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    const item = notes[index];

    if(item === null || item === undefined) {
        return (
            <div className="w-full p-5 h-full max-h-[555px] font-nunito">
                <h1 className="font-bold w-fit text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-amber-500 text-2xl">
                    Change Note
                </h1> 
                <hr className="w-full my-2" />
                <p className="italic text-zinc-500">
                    You need to double click one of the note list to change it.
                </p>
            </div>
        )
    }else{
        return (
            <div className="w-full p-5 h-full max-h-[555px] font-nunito">
                <h1 className="font-bold w-fit text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-amber-500 text-2xl">
                    Change Note
                </h1> 
                <hr className="w-full my-2" />
                <p className="italic text-zinc-500 text-sm">
                    Fill the form below to change the note.
                </p>
                <hr className="my-2 opacity-0" />
                <form onSubmit={ChangeSubmit} className="my-5 space-y-5">
                    <div className="relative">
                        <input type="text" required placeholder={item.notes_name} onChange={e => setTitle(e.target.value)} className="peer w-full px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 border-zinc-200 transition-all duration-300 h-10"/>
                        <p className="absolute top-0 left-0 bg-white text-sm text-zinc-500 peer-focus:text-zinc-600 font-bold w-fit px-2 translate-x-3 -translate-y-2.5">
                            Note's title
                        </p>
                    </div>
                    <div className="relative">
                        <textarea type="text" required placeholder={item.notes_desc} onChange={e => setDescription(e.target.value)} className="peer w-full px-5 py-3 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 border-zinc-200 transition-all duration-300 h-10 min-h-[50px]"/>
                        <p className="absolute top-0 left-0 bg-white text-sm text-zinc-500 peer-focus:text-zinc-600 font-bold w-fit px-2 translate-x-3 -translate-y-2.5">
                            Note's Description
                        </p>
                    </div>
                    <div className="flex gap-5">
                        <div className="relative w-1/2">
                            <input type="date" readOnly value={ item.due } className="peer w-full px-5 py-3 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 border-zinc-200 transition-all duration-300 h-10"/> 
                            <p className="absolute top-0 left-0 bg-white text-sm text-zinc-500 peer-focus:text-zinc-600 font-bold w-fit px-2 translate-x-3 -translate-y-2.5">
                                Previous Due Date
                            </p>
                        </div>
                        <div className="relative w-1/2">
                            <input type="date" required onChange={submitDate} className="peer w-full px-5 py-3 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 border-zinc-200 transition-all duration-300 h-10"/> 
                            <p className="absolute top-0 left-0 bg-white text-sm text-zinc-500 peer-focus:text-zinc-600 font-bold w-fit px-2 translate-x-3 -translate-y-2.5">
                                New Due Date
                            </p>
                        </div>
                        
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="text-sm">
                            <p className="font-bold text-zinc-500">Your due date is:</p>
                            <p className="text-zinc-500 tracking-tighter">
                                { showDateInd !== '' ? showDateInd : 'Please, choose a date'}
                            </p>
                        </div>
                        <button type="submit" className="w-1/3 rounded-2xl bg-zinc-700 text-amber-100 font-bold p-2 focus:bg-zinc-900 transition-all duration-150">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}