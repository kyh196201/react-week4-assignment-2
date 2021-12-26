import reducer from './reducer';

describe('reducer', () => {
  context('입력된 state가 없으면', () => {
    it(' 기본값이 반환된다', () => {
      const state = reducer(undefined, {});

      expect(state.name).toBe('');
      expect(state.category).toBe('');
      expect(state.address).toBe('');
    });
  });

  context('지정되지 않은 type이 넘어가면', () => {
    it('state 그대로 반환된다', () => {
      const expectState = { name: 'test' };

      const state = reducer(expectState, {});

      expect(state.name).toBe(expectState.name);
    });
  });
});
