import {fork, all} from 'redux-saga/effects';
import StoreSaga from './StoreSaga';

function* rootSaga() {
  /*The saga is waiting for a action called LOAD_DASHBOARD to be activated */
  yield all([StoreSaga()]);
}

export default rootSaga;
