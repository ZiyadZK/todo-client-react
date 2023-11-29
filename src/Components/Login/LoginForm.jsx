import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {  useState } from "react";



export default function LoginForm() {
    // INITIALIZE
    const [typePassword, setTypePassword] = useState('password');
    const [visible, setVisible] = useState('text-zinc-400');
    const [fetchResponse, setFetchResponse] = useState('');

    // FORM DATA
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const SubmitLogin = async (event) => {
        try{
            event.preventDefault();
            const dataBody = {
                username: username,
                password: password
            }

            const { data } = await axios.post('https://core-api-mqxn4q5g2q-et.a.run.app/api/login', dataBody);
            const response = data.data;
            alert(response.token);
        }catch(error) {
            const { response } = error;
            if(response.status == 402) {
                alert('Akun anda tidak ditemukan!');
            }
        }
    }


    const togglePassword = () => {
        if(typePassword === 'password') {
            setTypePassword('text');
            setVisible('text-zinc-700');
        }else{
            setTypePassword('password');
            setVisible('text-zinc-400');
        }
    }

    // FUNCTIONS
    
    return (
        <form onSubmit={SubmitLogin} className="flex flex-col items-center gap-5">
            <div className="relative w-1/2">
                <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                    Username
                </p>
                <input required type="text" onChange={e => setUsername(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100" autoComplete="off"></input>
            </div>
            <div className="relative w-1/2">
                <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                    Password
                </p>
                <input required type={typePassword} onChange={e => setPassword(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100"></input>
                <button type="button" onClick={togglePassword} className={`absolute top-0 right-0 w-10 h-full flex items-center justify-center transition-all duration-300 ` + visible} autoComplete="off">
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                </button>
            </div>
            <hr className="opacity-0"/>
            <button type="submit" className="w-1/2 flex items-center justify-center bg-zinc-500 font-bold text-white rounded-2xl p-2 gap-3 hover:bg-zinc-600 focus:bg-zinc-700 transition-all duration-300">
                Sign in
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
        </form>
    );
}