import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { endVote, getRoom, resetRoom } from "../../requests";
import { IRoom, statusVoted, statusVoting } from "../../models";
import { Card } from "../Card/Card";
import { Seat } from "../Seat/Seat";

export function Room() {
    const { id } = useParams();
    const [ room, setRoom ] = useState<IRoom>();
    const buttonStyle = "font-bold bg-indigo-500 hover:opacity-50 ease-in-out duration-200 rounded-md text-slate-50 py-3 px-6 mt-3";
    const handleResetRoom = () => {
        resetRoom(id || '');
    }
    const handleEndVote = () => {
            endVote(id || '');
    }
    useEffect(() => {
        getRoom(id || '')
            .then((room: IRoom) => {
                setRoom(room);
            })
    }, [])
    return (
        room ?
            <div className="flex flex-col items-center">
                <h2 className="text-xl sm:text-2xl text-indigo-500 mb-6">{room.name}</h2>
                <div className="flex justify-center flex-wrap">
                    {room.seats.map(seat => {
                        return <Seat room={room} seat={seat} key={seat.user.id} />
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
            </div> :
            <span>Loading</span>
    )
}