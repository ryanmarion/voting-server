import {List,Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state,entries){
  const list = List(entries);
  return state.set('entries', list)
              .set('initialEntries', list);
}

export function next(state, round = state.getIn(['vote', 'round'], 0)) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
        round: round + 1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    });
  }
}

export function restart(state) {
  const round = state.getIn(['vote', 'round'], 0);
  return next(
    state.set('entries', state.get('initialEntries'))
         .remove('vote')
         .remove('winner'),
    round
  );
}



export function vote(voteState, entry) {
  if (voteState.get('pair').includes(entry)) {
    return voteState.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );
  } else {
    return voteState;
  }
}

function getWinners(vote){
  if (!vote) return [];
  const [a,b] = vote.get('pair');//grab the pair being voted on
  const aVotes = vote.getIn(['tally',a],0);//how many votes for a
  const bVotes = vote.getIn(['tally',b],0);//'                ' b
  if(aVotes > bVotes) return [a];
  if(bVotes > aVotes) return [b];
  else return [a,b];
}
