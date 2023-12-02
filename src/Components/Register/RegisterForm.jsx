import React, { useState } from 'react';
import { faCog, faCogs, faEnvelope, faPaperPlane, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';


export default function RegisterForm() {
    const [cookie, setCookie, removeCookie] = useCookies(['token']);

    const navigate = useNavigate();
    // Initialize Data Form
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitDisable, setSubmitDisable] = useState(false);
    
    const SubmitRegister = (event) => {
        event.preventDefault();

        setSubmitDisable(true);
        
        Swal.fire({
            title: "Signing you up..",
            icon: "info",
            text: "Please, wait a little bit while we making a new data for you :)",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: async () => {
                try {
                    if(password !== confirmPassword) {
                        return Swal.fire({
                            title: "Failed to signing you up",
                            text: "It seems like your password and your confirm password did not match",
                            icon: "warning"
                        });
                    }
    
                    const dataBody = {
                        email: email,
                        username: username,
                        password: password,
                        confirmPassword: confirmPassword
                    }
    
                    const { data } = await axios.post(`https://todo-api-mqxn4q5g2q-as.a.run.app/api/register`, dataBody, {
                        withCredentials: true
                    });
                    const response = data.result;
                    setCookie('dataToken', response.dataToken, {maxAge: 120});
                    // console.log(response.dataToken);
                    Swal.fire({
                        icon: "info",
                        title: "Verify your data",
                        text: "We have sent you the link to verify your data, please check your email!"
                    })

                    setTimeout(() => {
                        setSubmitDisable((state) => !state);
                    }, 1000);
                } catch(error) {
                    return Swal.fire({
                        title: "Failed to sign up",
                        icon: "error",
                        text: "It seems like our server is down or something, please just wait a little bit :)",
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
                
            }
        })
    }

    return (
        <form onSubmit={SubmitRegister} className="space-y-5 w-4/5">
            <div className="flex items-center w-full">
                <div className="w-1/6 flex items-center justify-center text-zinc-700">
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </div>
                <div className="w-5/6 relative">
                    <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                        Email
                    </p>
                    <input required type="text" onChange={e => setEmail(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100" autoComplete="off"></input>
                </div>
            </div>
            <div className="flex items-center w-full">
                <div className="w-1/6 flex items-center justify-center text-zinc-700">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                <div className="w-5/6 relative">
                    <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                        Username
                    </p>
                    <input required type="text" onChange={e => setUsername(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100" autoComplete="off"></input>
                </div>
            </div>
            <div className="flex items-center w-full">
                <div className="w-1/6 flex items-center justify-center text-zinc-700">
                    <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                </div>
                <div className="w-5/6 relative">
                    <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                        Password
                    </p>
                    <input required type="text" onChange={e => setPassword(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100" autoComplete="off"></input>
                </div>
            </div>
            <div className="flex items-center w-full">
                <div className="w-1/6 flex items-center justify-center text-zinc-700">
                    <FontAwesomeIcon icon={faCogs}></FontAwesomeIcon>
                </div>
                <div className="w-5/6 relative">
                    <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                        Confirm Password
                    </p>
                    <input required type="text" onChange={e => setConfirmPassword(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100" autoComplete="off"></input>
                </div>
            </div>
            <div className="flex flex-col items-center w-full items-center">
                <button type="submit" className="p-2 rounded-2xl font-bold tracking-tighter text-amber-100 bg-zinc-700 w-2/3 flex items-center justify-center gap-2 hover:bg-zinc-800 hover:text-amber-50 disabled:bg-zinc-200 disabled:text-zinc-400" disabled={submitDisable}>
                    Sign up
                    <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                </button>
                <a href="/login" className="text-sm tracking-tighter hover:font-bold text-zinc-700 mt-2">Use an existing account</a>
            </div>
        </form> 
    )

}