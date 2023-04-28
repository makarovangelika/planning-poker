import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { endVote, getRoom, leaveRoom, resetRoom, url } from "../../requests";
import { IRoom, statusVoted, Registration } from "../../models";
import { Card } from "../Card/Card";
import { Seat } from "../Seat/Seat";

interface RoomProps {
    user: Registration
}

export function Room({ user } : RoomProps) {
    const { id } = useParams();
    const [ room, setRoom ] = useState<IRoom>();
    const navigate = useNavigate();
    const buttonStyle = "font-bold bg-indigo-500 hover:opacity-50 ease-in-out duration-200 rounded-md text-slate-50 py-3 px-6 mt-3";
    const handleResetRoom = () => {
        resetRoom(id || '');
    }
    const handleEndVote = () => {
            endVote(id || '');
    }
    const handleLeaveRoom = () => {
        leaveRoom(id || '');
        navigate('/');
    }
    let wsConn: WebSocket | null = null;
    const urlInstance = new URL(url)
    urlInstance.protocol = urlInstance.protocol === 'https:' ? 'wss:' : 'ws:';

    useEffect(() => {
        getRoom(id || '')
            .then((room: IRoom) => {
                setRoom(room);
            })
            .then(() => {
                if (wsConn) {
                    return
                }
                wsConn = new WebSocket(`${urlInstance.href}rooms/${id}/subscribe?authorization=${user.token}`);
                wsConn.addEventListener('message', (wsEvent => {
                    let room = JSON.parse(wsEvent.data);
                    setRoom(room);
                }))
            })
            return () => {
                if (wsConn) {
                    wsConn.close();
                    wsConn = null
                }
            }
    }, []);
    return (
        room ?
            <>
                <div className="relative">
                    <button
                        className={`${buttonStyle} text-base sm:text-lg px-3 py-2 absolute right-0`}
                        onClick={handleLeaveRoom}>Leave room
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl sm:text-2xl text-indigo-500 mb-8">{room.name}</h2>
                    <div className="flex justify-center flex-wrap">
                        {room.seats.map(seat => {
                            return <Seat room={room} seat={seat} active={seat.active} key={seat.user.id} />
                        })}
                    </div>
                    {room.owner ?
                        (room.status === statusVoted ?
                            <button className={buttonStyle}
                                onClick={handleResetRoom}>
                                    Reset room
                            </button> :
                            <button className={buttonStyle}
                                onClick={handleEndVote}>
                                    Show cards
                            </button>
                        ):
                        <div className="rounded-md bg-indigo-500 opacity-50 text-slate-50 p-6 mt-3">
                            {room.status === statusVoted ? "Vote ended" : "Waiting for players' votes..."}
                        </div>
                    }
                    <div className="mt-6 flex justify-center flex-wrap gap-y-1">
                        {room.voteCards.map((card, index) => {
                            return <Card disabled={room.status === statusVoted} vote={card} key={index} value={index}/>
                        })}
                    </div>
                </div>
            </> :
            <span>Loading</span>
    )
}