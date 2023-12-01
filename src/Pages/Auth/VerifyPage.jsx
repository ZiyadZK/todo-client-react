export default function VerifyPage({ status }) {
    if(status === "success") {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-zinc-50 text-zinc-700 font-nunito">
                <div className="w-1/3 bg-white rounded-2xl border p-5">
                    <div className="flex justify-center w-full">
                        <img src="https://cdn-icons-png.flaticon.com/128/8928/8928495.png?ga=GA1.1.1610299679.1689303514&semt=ais" alt="" />
                    </div>
                    <div className="flex justify-center w-full">
                        <h1 className="font-bold text-2xl">
                            Your Email has been Verified!
                        </h1>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <p className="text-sm text-zinc-600">
                            It seems like your data has been verified!
                        </p>
                        <hr className="my-2 opacity-0" />
                        <p className="text-sm text-zinc-500 text-center">
                            You can <a href="/login" className="font-bold hover:text-zinc-800">Sign in</a> your account <br />
                            to enjoy making your own notes and reminders
                        </p>
                    </div>
    
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-zinc-50 text-zinc-700 font-nunito">
                <div className="w-1/3 bg-white rounded-2xl border p-5">
                    <div className="flex justify-center w-full">
                        <img src="https://cdn-icons-png.flaticon.com/128/8928/8928495.png?ga=GA1.1.1610299679.1689303514&semt=ais" alt="" />
                    </div>
                    <div className="flex justify-center w-full">
                        <h1 className="font-bold text-2xl">
                            Your Email is not verified yet!
                        </h1>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <p className="text-sm text-zinc-600">
                            You need to verify your email first in your Email!
                        </p>
                    </div>
                </div>
            </div>
        )
    }

}
