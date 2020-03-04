const initialState = {
  remote_id: null,
  isPlay: null,
  isConnect: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_REMOTE_ID':
      let newState = {
        ...state,
        remote_id: action.remote_id,
      };
      return newState;
    case 'CHANGEPLAY':
      newState = {
        ...state,
        isPlay: action.payload,
      };
      return newState;
    case 'ISCONNECT':
      newState = {
        ...state,
        isConnect: action.payload,
      };
      return newState;
    case 'STOP_SONG':
      return action.data;
    case 'NEXT_SONG':
      return action.data;
    case 'AUTO_NEXT':
      return action.data;
    case 'VOL_UP':
      return action.data;
    case 'VOL_DOWN':
      return action.data;
    default:
      return state;
  }
}
