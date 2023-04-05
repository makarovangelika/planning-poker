import { Template, Vote } from './models';

export function voteToString(vote: Vote) {
    switch(vote.type) {
        case 'value':
            return vote.value.toString();
        case 'unknown':
            return '?';
        case 'infinity':
            return  '∞';
        case 'break':
            return '☕';
    }
}

export function templateToString(template: Template) {
    const stringVotes = template.votes.map(vote => {
        return voteToString(vote);
    }).join(', ');
    return `${template.title} ( ${stringVotes} )`;
}