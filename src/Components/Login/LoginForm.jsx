import { faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {  useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Loading = (state) => {
    if(state) {
        return Swal.fire({
            title: "Signing you in..",
            text: "Please, wait a little bit",
            showConfirmButton: false,
            allowOutsideClick: false
        })
    }else{
        return null;   
    }

};


export default function LoginForm() {
    
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    
    // INITIALIZE
    const [typePassword, setTypePassword] = useState('password');
    const [visible, setVisible] = useState('text-zinc-400');

    // FORM DATA
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);

    const navigate = useNavigate();

    

    
    // console.log(isRemember);
    const toggleIsRemember = () => {
        setIsRemember(!isRemember)
    }

    const SubmitLogin = async (event) => {
        event.preventDefault();
        if(!password || !username) {
            return Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "Username or Password must be filled to continue"
            });
        }
        
        const dataBody = {
            username: username,
            password: password
        };

        // const { data } = await axios.post('https://todo-api-mqxn4q5g2q-as.a.run.app/api/login', dataBody);
        // console.log(data);
        
        Swal.fire({
            title: "Signing you in..",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: async () => {
                try {
                    const { data } = await axios.post('https://todo-api-mqxn4q5g2q-as.a.run.app/api/login', dataBody, {
                        withCredentials: true
                    });
                    // console.log(dataBody);
                    if(data.result.token) {
                        const maxAge = isRemember ? 3600 : 1800;
                        setCookie('token', data.result.token, {maxAge: maxAge, sameSite: true});
                        Swal.close();
                        Swal.fire({
                            icon: "success",
                            title: "Sign in successfully",
                            timer: 2000,
                            showConfirmButton: false
                        });
                        navigate('/');
                    }
                } catch (error) {
                    Swal.close();
                    Swal.fire({
                        icon: "error",
                        title: "Failed to sign in",
                        text: "It seems like your username or password is wrong, please try again",
                    })
                }
            }
        });
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
        <form className="flex flex-col items-center">
            <div className="relative w-1/2">
                <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                    Username
                </p>
                <input required type="text" onChange={e => setUsername(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100" autoComplete="off"></input>
            </div>
            <hr className="my-2" />
            <div className="relative w-1/2">
                <p className="absolute top-0 left-0 text-sm font-bold tracking-tighter text-zinc-700 translate-x-3 -translate-y-2.5 px-2 w-fit bg-white">
                    Password
                </p>
                <input required type={typePassword} onChange={e => setPassword(e.target.value)} className="w-full h-10 px-5 rounded-2xl border outline-none hover:border-zinc-700 focus:border-zinc-700 transition-all duration-300 placeholder-zinc-100"></input>
                <button type="button" onClick={togglePassword} className={`absolute top-0 right-0 w-10 h-full flex items-center justify-center transition-all duration-300 ` + visible} autoComplete="off">
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                </button>
            </div>
            <p className="w-1/2 flex gap-2 items-center text-zinc-700">
                <input type="checkbox" checked={isRemember} onChange={toggleIsRemember} className="accent-zinc-700" />
                Remember me
            </p>
            <hr className="my-5 opacity-0"/>
            <button type="button" onClick={SubmitLogin} className="w-1/2 flex items-center justify-center bg-zinc-500 font-bold text-white rounded-2xl p-2 gap-3 hover:bg-zinc-600 focus:bg-zinc-700 transition-all duration-300">
                Sign in
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
        </form>
    );
}