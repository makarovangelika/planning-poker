import { voteToString } from '../../voteTemplates';
import { Vote } from '../../models';
import { voteRequest } from '../../requests';
import { useParams } from 'react-router-dom';

interface cardProps {
    disabled: boolean
    vote: {
        vote: Vote,
        active: boolean
    },
    value: number
}

export function Card({ disabled, vote, value }: cardProps) {
    const { id } = useParams();
    const activeCardStyle = vote.active && "relative -top-2 bg-indigo-500 text-slate-50";
    const disabledStyle = "text-slate-50 bg-slate-300 border-slate-300";
    const activeButtonStyle = `${activeCardStyle} text-indigo-500 hover:text-slate-50 hover:bg-indigo-500 ease-in-out duration-200 border-indigo-500`;
    const handleVote = () => {
        if (!disabled) {
            voteRequest(id || '', value);
        }
    }
    return (
        <button disabled={disabled} onClick={handleVote}
            className={`${disabled ? disabledStyle : activeButtonStyle} rounded-md border-2 m-1 w-9 h-16`}>
                {voteToString(vote.vote)}
        </button>
    )
}