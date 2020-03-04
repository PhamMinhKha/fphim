import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  take,
} from 'redux-saga/effects';
import {API_GET_LOGIN, API_STORE_LOGIN} from './../actions/actions';

import {connect} from './API/socketAPI';
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* connectSoketIo(action) {
  try {
    const data = yield call(connect);
    console.log('--> nhận data truyền vào redux', data);
    yield put({
      // gọi redux
      type: 'SET_REMOTE_ID',
      remote_id: data.remote_id,
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
function* autoNext(payload) {
  try {
    console.log(payload);
    const data = yield call(autoNext, payload);
    return true;
  } catch (e) {
    console.log(e);
    yield put({
      type: 'SET_ERROR',
      error: e,
    });
  }
}

export default function* loginSaga() {
  yield takeLatest('CONNECT', connectSoketIo);
  yield takeLatest('AUTONEXT', autoNext);
  // yield takeLatest('LOGIN_TOKEN', login_with_token);
}
