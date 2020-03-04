const initialState = {
  tab: 'Home',
  link: '',
  code: '',
  chamdiem: false,
  player: 'native',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SETSETTING':
      let newState = {
        ...state,
        tab: action.payload.tab,
        link: action.payload.link,
        code: action.payload.code,
        player: action.payload.player,
      };
      console.log(action);
      return newState;
    case 'SETCODE':
      newState = {
        ...state,
        code: action.code,
      };
      return newState;
    case 'SETCHAMDIEM':
      newState = {
        ...state,
        chamdiem: action.chamdiem,
      };
      return newState;

    default:
      return state;
  }
}
