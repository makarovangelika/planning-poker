import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoom } from "../../requests";
import { IRoom } from "../../models";
import { Card } from "../Card/Card";
import { Seat } from "../Seat/Seat";

export function Room() {
    const { id } = useParams();
    const [ room, setRoom ] = useState<IRoom>();
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
                <div>
                    {room.seats.map(seat => {
                        return <Seat seat={seat} key={seat.user.id} />
                    })}
                </div>
                <div className="rounded-md bg-indigo-500 opacity-50 text-slate-50 p-6 mt-3 flex justify-center flex-wrap">
                    Waiting for players' votes...
                </div>
                <div className="mt-6 flex justify-center flex-wrap">
                    {room.voteCards.map((card, index) => {
                        return <Card vote={card.vote} key={index} value={index}/>
                    })}
                </div>
            </div> :
            <span>Loading</span>
    )
}