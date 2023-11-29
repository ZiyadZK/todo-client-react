
import LoginTitle from "../../Components/Login/LoginTitle";
import LoginForm from "../../Components/Login/LoginForm";
// import { Link } from "react-router-dom";

const LoginPage = () => {

    return (
        <div className="w-full h-screen flex items-center justify-center bg-zinc-100 font-nunito">
            <div className="w-1/3 p-5 border rounded-2xl bg-white">
                <LoginTitle title="Sign in to your Acount"></LoginTitle>
                <p className="text-zinc-500 text-sm tracking-tighter text-center">Welcome Back, you need to sign in so we can track your record!</p>
                <hr className="my-5 opacity-0" />
                <LoginForm></LoginForm>
                <a href="/register" className="flex w-full justify-center text-sm font-bold text-zinc-500 hover:text-zinc-700 transition-all duration-300">
                    Create an Account
                </a>
                <div className="flex justify-center w-full my-2 gap-5 items-center">
                    <hr className="w-1/3"/>
                    <p className="text-zinc-400 font-bold text-sm">Or</p>
                    <hr className="w-1/3"/>
                </div>
                <article className="flex flex-col items-center w-full">
                    <p className="text-sm text-zinc-500 tracking-tighter">
                        Forget the password? <a href="/forgot" className="text-zinc-700 font-bold hover:text-rose-700">Reset it!</a>
                    </p>
                </article>
                <article className="flex items-center justify-center mt-5 text-xs text-zinc-600 gap-2">
                    <div className="flex items-center gap-1 ">
                        <img src="/logo.png" className="w-5 h-5" alt="" />
                        <span className="font-bold">Todo</span> Application
                    </div>
                    -
                    <div className="italic">
                        Powered by <a href="https://github.com/uppermoon12" className="hover:font-bold">Uppermoon12</a> & <a href="https://cloud.google.com" className="hover:font-bold">Google Cloud</a>
                    </div>
                </article>
            </div>
        </div>
    );
}
export default LoginPage;