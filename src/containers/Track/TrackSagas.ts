import axios from "axios";
import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { authSelectors } from "../auth/selectors";
import {
  getPlaylistTracksFailed,
  getPlaylistTracksSuccess,
  removeTrackFromPlaylistSuccess,
  removeTrackFromPlaylistFailed,
  searchTracksByNameSuccess,
  searchTracksByNameFailed,
  addTrackToPlaylistFailed,
  addTrackToPlaylistSuccess,
} from "./actions";

import {getPlaylistDetailsRequest} from "../Playlist/actions"

/**
 * Saga to get playlist tracks from the Spotify API.
 * @param {Object} action - The Redux action with payload containing playlistId.
 */
export function* getPlaylistTracksSaga(action: any): Generator<any, void, any> {
  try {
    const { playlistId } = action.payload;
    const accessToken = yield select(authSelectors.getAccessToken);

    const playlistTracks = yield call(() =>
      axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
    );

    yield put(getPlaylistTracksSuccess(playlistTracks.data));
  } catch (error: any) {
    console.error("Error fetching playlist tracks:", error);
    yield put(getPlaylistTracksFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "track/getPlaylistTracksRequest" action
 * and triggers getPlaylistTracksSaga accordingly.
 */
function* watchGetPlaylistTracksSaga() {
  yield takeEvery("track/getPlaylistTracksRequest", getPlaylistTracksSaga);
}

/**
 * Saga to remove a track from a playlist on Spotify.
 * @param {Object} action - The Redux action with payload containing playlistId, trackURI, and snapshotId.
 */
function* removeTrackFromPlaylistSaga(action: any): Generator<any, void, any> {
  try {
    const { playlistId, trackURI, snapshotId } = action.payload;
    const accessToken = yield select(authSelectors.getAccessToken);

    const request = async () => {
      const response = await axios.delete(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          data: {
            tracks: [
              {
                uri: trackURI,
              },
            ],
            snapshot_id: snapshotId,
          },
        }
      );

      return response.data;
    };

    const apiResponse: any = yield call(request);

    if (apiResponse.snapshot_id) {
      // Dispatch the success action
      yield put(removeTrackFromPlaylistSuccess());
      yield call(getPlaylistTracksSaga, { payload: { playlistId } });
    }
  } catch (error: any) {
    console.error("Error removing track from playlist:", error);
    yield put(removeTrackFromPlaylistFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "track/removeTrackFromPlaylistRequest" action
 * and triggers removeTrackFromPlaylistSaga accordingly.
 */
function* watchRemoveTrackFromPlaylistSaga() {
  yield takeEvery(
    "track/removeTrackFromPlaylistRequest",
    removeTrackFromPlaylistSaga
  );
}

/**
 * Saga to search for tracks by name on Spotify.
 * @param {Object} action - The Redux action with payload containing trackName.
 */
function* searchTracksByNameSaga(action: any): Generator<any, void, any> {
  try {
    const { trackName } = action.payload;
    const accessToken = yield select(authSelectors.getAccessToken);

    const searchResults = yield call(() =>
      axios.get(`https://api.spotify.com/v1/search?q=${trackName}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
    );

    yield put(searchTracksByNameSuccess(searchResults.data.tracks.items));
  } catch (error: any) {
    console.error("Error searching tracks by name:", error);
    yield put(searchTracksByNameFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "track/searchTracksByNameRequest" action
 * and triggers searchTracksByNameSaga accordingly.
 */
function* watchSearchTracksByNameSaga() {
  yield takeEvery("track/searchTracksByNameRequest", searchTracksByNameSaga);
}

/**
 * Saga to add track to a playlist.
 * @param {Object} action - The Redux action with payload containing playlistId & trackURI.
 */
function* addTrackToPlaylistSaga(action: any): Generator<any, void, any> {
  try {
    const { playlistId, trackURI } = action.payload;
    const accessToken = yield select(authSelectors.getAccessToken);  

    const request = async () => {
      const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        { uris: [trackURI] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    };

    const apiResponse: any = yield call(request);

    if (apiResponse.snapshot_id) {
      yield put(addTrackToPlaylistSuccess());
      //refresh the list of the selected playlist
      yield call(getPlaylistTracksSaga, { payload: { playlistId } });

      // why do we have to refresh the details of the selected playlist?
      // => by adding a track to a playlist, its snapshotId changes, so you have to refresh the data of the selected playlist
      // => why here is important: to be able to delete a track from a playlist you must have the last snapshot
      yield put(getPlaylistDetailsRequest({ playlistId }))
    }
  } catch (error: any) {
    console.error("Error adding track to playlist:", error);
    yield put(addTrackToPlaylistFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "track/addTrackToPlaylistRequest" action
 * and triggers addTrackToPlaylistSaga accordingly.
 */
function* watchAddTrackToPlaylistSaga() {
  yield takeEvery("track/addTrackToPlaylistRequest", addTrackToPlaylistSaga);
}



export {
  watchGetPlaylistTracksSaga,
  watchRemoveTrackFromPlaylistSaga,
  watchSearchTracksByNameSaga,
  watchAddTrackToPlaylistSaga,
};
