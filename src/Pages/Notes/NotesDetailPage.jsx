import { faCalendar, faCircleCheck, faClock, faDeleteLeft, faDotCircle, faFileCirclePlus, faFilePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotesDetailPage ({ index, notes }) {
    // alert(item);
    const item = notes[index];
    // console.log(item);
    return (
        <div className="w-full p-5 h-full max-h-[555px]">
            <h1 className="font-bold w-fit text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-amber-500 text-2xl">
                Notes Details
            </h1> 
            <hr className="w-full my-2" />
            <p className="italic text-zinc-400 tracking-tighter text-sm">
                Click one of your notes on the left to see details of it.
            </p>
            <hr className="my-2 opacity-0" />
            <div className="flex items-center gap-5 text-sm text-zinc-600 font-bold">
                <FontAwesomeIcon icon={faDotCircle} />
                {item.notes_id || ''}
            </div>
            <p className="flex items-center gap-5 text-sm text-zinc-600">
                <FontAwesomeIcon icon={faCalendar} />
                { item.due || '-' }
                { item.checked ? 
                <span className="text-green-500 ">
                    <FontAwesomeIcon icon={faCircleCheck} /> Checked
                </span> 
                    : 
                <span className="text-orange-500 ">
                    <FontAwesomeIcon icon={faClock} /> Pending
                </span>  
                }
                
                
            </p>
            <hr className="my-3 opacity-0" />
            <div className="flex gap-5">
                <p className="w-1/6 font-bold text-zinc-700">
                    Title
                </p>
                <div className="w-5/6 text-zinc-700">
                    { item.notes_name || '-' }
                </div>
            </div>
            <hr className="my-2 opacity-0" />
            <div className="flex gap-5">
                <p className="w-1/6 font-bold text-zinc-700">
                    Description
                </p>
                <div className="w-5/6 text-zinc-700">
                    { item.notes_desc || '-'}
                </div>
            </div>
        </div>
    )
}