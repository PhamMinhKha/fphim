import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  take,
} from 'redux-saga/effects';

import {getStore, setStore} from './API/Store';

//   import {connect} from './API/socketAPI';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* STORE_DATA(action) {
  try {
    // console.log('ccc', action);
    const data = yield setStore(action.payload);
    yield put({
      // gọi redux
      type: 'SETSETTING',
      payload: data,
    });
    // yield put({
    //   // gọi redux
    //   type: 'API_STORE_COSO',
    //   coso,
    // });
  } catch (e) {
    alert('Nhập sai rồi');
  }
}
function* GET_STORE(payload) {
  try {
    var data = yield call(getStore);
    // console.log(data);
    yield put({
      // gọi redux
      type: 'SETSETTING',
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: 'SET_ERROR',
      error: e,
    });
  }
}

export default function* StoreSaga() {
  yield takeLatest('SET_SETTING', STORE_DATA);
  yield takeLatest('GET_SETTING', GET_STORE);
  // yield takeLatest('SET_CHAMDIEM', autoNext);
}
