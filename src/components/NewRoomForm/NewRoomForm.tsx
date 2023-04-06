import { useState, useEffect } from "react";
import { getTemplates } from '../../requests';
import { Template } from '../../models';
import { templateToString } from '../../voteTemplates';

export function NewRoomForm() {
    const [ roomName, setRoomName ] = useState("");
    const [templates, setTemplates] = useState<Template[]>([]);
    const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(e.target.value);
    }
    useEffect(() => {
        getTemplates().
            then((templates: Template[]) => {
                setTemplates(templates);
            })
    }, []);
    return (
        <div className="flex flex-col items-center justify-start sm:justify-center h-5/6">
            <h2 className="mb-6 text-2xl">Choose a name and a voting system for your room</h2>
            <form className="flex flex-col items-center justify-center gap-y-4">
                <input type="text" value={roomName} placeholder="Room's name" onChange={handleRoomNameChange}
                    className="w-full border-2 border-gray-200 focus:outline-indigo-500 rounded-md p-3" />
                <select className="w-full bg-white p-3 border-2 border-gray-200 focus:border-indigo-500 rounded-md" name="voting-system">
                    {templates.map(template => {
                        return <option key={template.title} value={template.title}>{templateToString(template)}</option>
                    })}
                </select>
                <input type="submit" value="Create room"
                    className="w-full font-bold bg-indigo-500 hover:opacity-50 ease-in-out duration-200 rounded-md text-slate-50 p-3" />
            </form>
        </div>
    )
}