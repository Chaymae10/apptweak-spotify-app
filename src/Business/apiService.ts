import axios from "axios";
import { call, put, select, takeEvery } from "@redux-saga/core/effects";
import { authSelectors } from "../containers/auth/selectors";
import { getUserFailed, getUserSuccess, getUserPlaylistsSuccess,getUserPlaylistsFailed, createPlaylistRequest } from "../containers/auth/slice";


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
    
    yield put(getUserSuccess(playlistData));  
      // Invoke getUserPlaylistsSaga to refresh the user's playlists
    yield call(getUserPlaylistsSaga);
  } catch (error: any) {
    console.error("Error creating playlist:", error);
    yield put(getUserFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "auth/createPlaylistRequest" action and
 *  triggers createPlaylistSaga accordingly.
 */
function* watchCreatePlaylistSaga() {
  yield takeEvery("auth/createPlaylistRequest", createPlaylistSaga);
}


/**
 * Saga to fetch the user's playlists from the Spotify API.
 */
function* getUserPlaylistsSaga(): Generator<any, void, any> {
  try {
    // Utilisez yield pour invoquer la fonction select
    const accessToken = yield select(authSelectors.getAccessToken);

    // Utilisez yield pour invoquer la fonction call
    const playlists = yield call(() =>
      axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
    );

    console.log("Liste des playlists de l'utilisateur :", playlists.data);

    yield put(getUserPlaylistsSuccess(playlists.data));
  } catch (error: any) {
    console.error("Error fetching playlists:",  error);

    // Dispatchez l'action d'échec avec le message d'erreur
    yield put(getUserPlaylistsFailed({ message: error.message }));
  }
}

/**
 * Watcher saga that monitors the "auth/getUserPlaylistsRequest" action 
 * and triggers getUserPlaylistsSaga accordingly.
 */
function* watchGetUserPlaylistsSaga() {
  yield takeEvery("auth/getUserPlaylistsRequest", getUserPlaylistsSaga);
}

export { watchCreatePlaylistSaga, watchGetUserPlaylistsSaga };