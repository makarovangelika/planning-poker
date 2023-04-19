import { voteToString } from "../../voteTemplates";
import { ISeat } from "../../models";

interface SeatProps {
    seat: ISeat
}

export function Seat({ seat }: SeatProps) {
    const seatColor = seat.voted ? "bg-indigo-500" : "bg-slate-300"
    return (
        <div className="flex flex-col items-center">
            <div className={`rounded-md ${seatColor} text-indigo-500 w-8 h-14 m-1 flex justify-center items-center`}>{seat.voteOpened && voteToString(seat.vote)}</div>
            <span className="text-base font-bold">{seat.user.name}</span>
        </div>
    )
}