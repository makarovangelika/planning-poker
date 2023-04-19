import { voteToString } from '../../voteTemplates';
import { Vote, VoteResponse } from '../../models';
import { voteRequest } from '../../requests';
import { useParams } from 'react-router-dom';

interface cardProps {
    vote: Vote,
    value: number
}

export function Card({ vote, value }: cardProps) {
    const { id } = useParams();
    const handleVote = () => {
        voteRequest(id || '', value);
    }
    return (
        <button onClick={handleVote}
            className="rounded-md text-indigo-500 hover:text-slate-50 hover:bg-indigo-500 ease-in-out duration-200 border-indigo-500 border-2 m-1 w-8 h-14">{voteToString(vote)}</button>
    )
}