import axios from "axios";
import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { authSelectors } from "../auth/selectors";
import {
  getUserPlaylistsSuccess,
  getUserPlaylistsFailed,
  getPlaylistDetailsSuccess,
  getPlaylistDetailsFailed,
  createPlaylistFailed,
  createPlaylistSuccess

} from "../../containers/Playlist/actions";

/**
 * Saga to create a new Spotify playlist for the user.
 *
 * @param {object} action - The action triggering the start of the saga.
 */
function* createPlaylistSaga(action: any): Generator<any, void, any> {
  try {
    const { userId, name, description } = action.payload;

    // Utilisez yield pour invoquer la fonction select
    const accessToken = yield select(authSelectors.getAccessToken);

    const request = async () => {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name,
          description,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    };

    const playlistData: any = yield call(request);

    yield put(createPlaylistSuccess(playlistData));
    // Invoke getUserPlaylistsSaga to refresh the user's playlists
    yield call(getUserPlaylistsSaga);
  } catch (error: any) {
    console.error("Error creating playlist:", error);
    yield put(createPlaylistFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "auth/createPlaylistRequest" action and
 *  triggers createPlaylistSaga accordingly.
 */
function* watchCreatePlaylistSaga() {
  yield takeEvery("playlist/createPlaylistRequest", createPlaylistSaga);
}

/**
 * Saga to fetch the user's playlists from the Spotify API.
 */
function* getUserPlaylistsSaga(): Generator<any, void, any> {
  try {
    const accessToken = yield select(authSelectors.getAccessToken);

    const playlists = yield call(() =>
      axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
    );

    yield put(getUserPlaylistsSuccess(playlists.data));
  } catch (error: any) {
    console.error("Error fetching playlists:", error);
    yield put(getUserPlaylistsFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "auth/getUserPlaylistsRequest" action
 * and triggers getUserPlaylistsSaga accordingly.
 */
function* watchGetUserPlaylistsSaga() {
  yield takeEvery("playlist/getUserPlaylistsRequest", getUserPlaylistsSaga);
}

function* getPlaylistDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { playlistId } = action.payload; // Déstructuration correcte ici

    const accessToken = yield select(authSelectors.getAccessToken);

    const playlistDetails = yield call(() =>
      axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
    );

    yield put(getPlaylistDetailsSuccess(playlistDetails.data));
  } catch (error: any) {
    console.error(
      "Error fetching playlist details :",
      error
    );

    yield put(getPlaylistDetailsFailed({ message: error.message }));
  }
}

function* watchGetPlaylistDetailsSaga() {
  yield takeEvery("playlist/getPlaylistDetailsRequest", getPlaylistDetailsSaga);
}

export {
  watchCreatePlaylistSaga,
  watchGetUserPlaylistsSaga,
  watchGetPlaylistDetailsSaga,
};