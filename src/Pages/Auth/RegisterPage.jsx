
import RegisterForm from "../../Components/Register/RegisterForm";


export default function RegisterPage() {
    return (
        <div className="bg-zinc-100 w-full h-screen flex items-center justify-center font-nunito">
            <div className="w-1/2 border bg-white rounded-2xl flex items-center divide-x">
                <div className="w-1/2 p-5">
                    <div className="flex justify-center w-full">
                        <h1 className="w-fit text-transparent bg-clip-text bg-gradient-to-l from-zinc-500 to-zinc-800 font-bold text-2xl">
                            Sign Up your Account
                        </h1>
                    </div>
                    <p className="text-center text-xs text-zinc-500 tracking-tighter">
                        Hello there, create your account first so you can start your schedule!
                    </p>
                    <hr className="my-5 opacity-0" />
                    <div className="flex flex-col items-center w-full">
                        <RegisterForm />
                    </div>
                </div>
                <div className="w-1/2 relative overflow-hidden h-96">
                    <img src="/logo.png" alt="" className="absolute top-0 left-0 rotate-[-30deg] opacity-5 translate-x-36" />
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-5/6">
                            <div className="flex gap-2 items-center w-full">
                                <img src="/logo.png" alt="" className="w-1/4"/>
                                <article className="w-3/4">
                                    <h1 className="font-bold text-zinc-700 text-2xl">
                                        To-do Application
                                    </h1>
                                    <p className="text-zinc-600 tracking-tighter text-sm">
                                        by <a href="https://github.com/uppermoon12" className="font-bold">Uppermoon12</a> & <a href="https://cloud.google.com" className="font-bold">Google Cloud</a>
                                    </p>
                                </article>
                            </div>
                            <hr className="my-5 opacity-0" />
                            <p className="text-zinc-500 tracking-tighter text-sm">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis saepe ipsum harum veniam error facere maiores, amet cumque quisquam ab, fuga quae labore assumenda earum quidem, impedit numquam libero quis?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}