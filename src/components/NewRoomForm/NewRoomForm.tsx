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
        <>
            <h2>Choose a name and a voting system for your room</h2>
            <form>
                <input type="text" value={roomName} placeholder="Room's name" onChange={handleRoomNameChange} />
                <select name="voting-system">
                    {templates.map(template => {
                        return <option value={template.title}>{templateToString(template)}</option>
                    })}
                </select>
                <button>Create room</button>
            </form>
        </>
    )
}