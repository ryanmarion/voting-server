import {expect} from 'chai';
import {List,Map} from 'immutable';

describe('immutability',()=>{
  describe('A List', ()=>{
    function addMovie(currentState,movie){
      return currentState.push(movie);
    }

    it('is immutable',()=>{
      let state=List.of('trainspotting','28 days later');
      let nextState = addMovie(state,'Sunshine');

      expect(nextState).to.equal(List.of(
        'trainspotting',
        '28 days later',
        'Sunshine'
      ));
      expect(state).to.equal(List.of(
        'trainspotting',
        '28 days later'
      ));
    });
  });
});

describe('immutability', () => {

  // ...

  describe('a tree', () => {

    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });
  });
});
