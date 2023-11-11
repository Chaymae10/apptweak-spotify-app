import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorPayload, RequestStatus } from "../../types/requests";

const SPOTIFY_SCOPE = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];

const REDIRECT_URI = window.location.origin;

export interface User {
  userId?: string;
  userName?: string;
}

export interface PlaylistItem {
  userId: string;
  name: string;
  description?: string;
  id?: string;
}

export interface Playlist {
  items: PlaylistItem[];
}

export interface AuthState {
  accessToken?: string;
  user?: User;
  playlists: Playlist;
  status: RequestStatus;
  error?: string;
}

export interface AccessTokenPayload {
  accessToken: string;
}

const initialState: AuthState = {
  status: RequestStatus.IDLE,
  playlists: { items: [] },
};

// Create actions

export const getUser = createAction("auth/getUser");
export const getUserSuccess = createAction<User>("auth/getUserSuccess");
export const getUserFailed = createAction<ErrorPayload>("auth/getUserFailed");
export const createPlaylistRequest = createAction<PlaylistItem>(
  "auth/createPlaylistRequest"
);
export const getUserPlaylistsRequest = createAction(
  "auth/getUserPlaylistsRequest"
);
export const getUserPlaylistsSuccess = createAction<Playlist>(
  "auth/getUserPlaylistsSuccess"
);
export const getUserPlaylistsFailed = createAction<ErrorPayload>(
  "auth/getUserPlaylistsFailed"
);
export const fetchPlaylistsRequest = createAction("auth/fetchPlaylistsRequest");

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login() {
      const { REACT_APP_SPOTIFY_CLIENT_ID } = process.env;
      const scopes: string = SPOTIFY_SCOPE.join(",");

      window.location.href = `https://accounts.spotify.com/me/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}`;
    },
    setAccessToken(state, action: PayloadAction<AccessTokenPayload>) {
      state.accessToken = action.payload.accessToken;
      window.history.pushState({ REDIRECT_URI }, "", REDIRECT_URI);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(getUserSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.user = action.payload;
      })
      .addCase(getUserFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(getUserPlaylistsSuccess, (state, action) => {
        state.playlists = action.payload;
        state.status = RequestStatus.SUCCESS;
        state.error = undefined;
      })
      .addCase(getUserPlaylistsFailed, (state, action) => {
        state.playlists = { items: [] };
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
  },
});

export const { login, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
