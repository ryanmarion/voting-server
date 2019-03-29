import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries} from '../src/core';

describe('application logic',()=>{
  describe('setEntries',()=>{
    //make sure we add the entries to the state effectively
    it('adds thte entries to the state',()=>{
      const state = Map();
      const entries = List.of('Trainspotting','28 Days Later');
      const nextState = setEntries(state,entries);
      expect(nextState).to.equal(Map({
        entries:List.of('Trainspotting','28 Days Later')
      }));
    });

    //what if we pass in a regular array? Do we get an immutable structure back?
    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });


  });
});
