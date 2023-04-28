import { voteToString } from "../../voteTemplates";
import { ISeat, IRoom, statusVoted } from "../../models";

interface SeatProps {
    seat: ISeat,
    room: IRoom, active: boolean
}

export function Seat({ seat, room, active }: SeatProps) {
    const seatColor = `text-slate-50 + ${seat.voted ? "bg-indigo-500" : "bg-slate-300"}`;
    const revealedSeatsClass = room.status === statusVoted ? "border-2 border-indigo-500 text-indigo-500" :
    seatColor;
    return (
        <div className={`${active || "opacity-30"} flex flex-col items-center m-1`}>
            <div className={`rounded-md ${revealedSeatsClass} w-9 h-16 flex justify-center items-center`}>{seat.voteOpened && voteToString(seat.vote)}</div>
            <span className="text-base font-bold">{seat.user.name}</span>
        </div>
    )
}