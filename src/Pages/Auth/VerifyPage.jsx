export default function VerifyPage() {
    const email = 'true';

    if(email === 'false') {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-zinc-50 text-zinc-700 font-nunito">
                <div className="w-1/3 bg-white rounded-2xl border p-5">
                    <div className="flex justify-center w-full">
                        <img src="https://cdn-icons-png.flaticon.com/128/5147/5147767.png" alt="" />
                    </div>
                    <div className="flex justify-center w-full">
                        <h1 className="font-bold text-2xl">
                            Verification Link has been Sent!
                        </h1>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <p className="text-sm text-zinc-600">
                            Please, verify your email and confirm that your data is verified!
                        </p>
                        <hr className="my-2 opacity-0" />
                        <p className="text-sm text-zinc-500 text-center">
                            <a href="/" className="font-bold hover:text-zinc-800">Resend verification link</a> to your email <br />
                            kakangtea74@gmail.com
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
                            Your Email has been Verified!
                        </h1>
                    </div>
                    <div className="flex flex-col items-center w-full">
                        <p className="text-sm text-zinc-600">
                            It seems like your data has been verified already!
                        </p>
                        <hr className="my-2 opacity-0" />
                        <p className="text-sm text-zinc-500 text-center">
                            You can go to your <a href="/notes" className="font-bold hover:text-zinc-800">Notes</a> to enjoy <br />
                            making your own notes and reminders
                        </p>
                    </div>
    
                </div>
            </div>
        )
    }

}