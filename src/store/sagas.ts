import { all } from "@redux-saga/core/effects";

import authSaga from "../containers/auth/authSagas";
import { watchCreatePlaylistSaga, watchGetUserPlaylistsSaga } from "../Business/apiService";

export default function* rootSaga() {
  yield all([
    authSaga(),
    watchCreatePlaylistSaga(),
    watchGetUserPlaylistsSaga(),
  ]);
}
