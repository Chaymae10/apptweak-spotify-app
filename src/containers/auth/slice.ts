import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  RequestStatus } from "../../types/requests";
import { Playlist,AuthState, AccessTokenPayload } from "../../types/requests";
import {getUser, getUserFailed, getUserSuccess, getUserPlaylistsFailed, getUserPlaylistsRequest, getUserPlaylistsSuccess, getPlaylistDetailsFailed, getPlaylistDetailsSuccess, getPlaylistTracksFailed, getPlaylistTracksSuccess, setDefaultPlaylist} from "../actions/actions";


const SPOTIFY_SCOPE = [
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
];

const REDIRECT_URI = window.location.origin;

const initialState: AuthState = {
  status: RequestStatus.IDLE,
  playlistCollection: { items: [] },
  playlistDetails: null,
  playlistTracks: { items: [] },
  defaultPlaylist: null,
};


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
    setDefaultPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.defaultPlaylist = action.payload;
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
      }).addCase(setDefaultPlaylist, (state, action) => {
        state.defaultPlaylist = action.payload;
      }) .addCase(getUserPlaylistsRequest, (state) => {
      })
      .addCase(getUserPlaylistsSuccess, (state, action) => {
        state.playlistCollection = action.payload;
        state.status = RequestStatus.SUCCESS;
        state.error = undefined;
      })
      .addCase(getUserPlaylistsFailed, (state, action) => {
        state.playlistCollection = { items: [] };
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      }).addCase(getPlaylistDetailsSuccess, (state, action) => {
        state.playlistDetails = action.payload;
        state.status = RequestStatus.SUCCESS;
        state.error = undefined;
      })
      .addCase(getPlaylistDetailsFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      }).addCase(getPlaylistTracksSuccess, (state, action) => {
        state.playlistTracks = action.payload;
        state.status = RequestStatus.SUCCESS;
        state.error = undefined;
      })
      .addCase(getPlaylistTracksFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
      
  },
});

export const { login, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
