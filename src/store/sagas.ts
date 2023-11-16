import { all } from "@redux-saga/core/effects";

import authSaga from "../containers/auth/authSagas";
import {watchRemoveTrackFromPlaylistSaga, watchSearchTracksByNameSaga,
   watchGetPlaylistTracksSaga, watchAddTrackToPlaylistSaga} from "../containers/Track/TrackSagas";
  import { watchCreatePlaylistSaga, watchGetUserPlaylistsSaga, watchGetPlaylistDetailsSaga } from "../containers/Playlist/PlaylistSagas";

export default function* rootSaga() {
  yield all([
    authSaga(),
    watchCreatePlaylistSaga(),
    watchGetUserPlaylistsSaga(),
    watchGetPlaylistDetailsSaga(),
    watchGetPlaylistTracksSaga(),
    watchRemoveTrackFromPlaylistSaga(),
    watchSearchTracksByNameSaga(),
    watchAddTrackToPlaylistSaga(),
    
  ]);
}
