const initialState = {
  tab: 'Home',
  link: '',
  code: '',
  chamdiem: false,
  player: 'native',
  useFshare: false,
  username: null,
  password: null,
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
        useFshare: action.payload.useFshare,
        username: action.payload.username,
        password: action.payload.password,
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
