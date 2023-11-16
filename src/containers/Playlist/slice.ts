import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../types/requests";
import {
  createPlaylistRequest,
  createPlaylistSuccess,
  createPlaylistFailed,
  setSelectedPlaylist,
  getUserPlaylistsRequest,
  getUserPlaylistsSuccess,
  getUserPlaylistsFailed,
  getPlaylistDetailsRequest,
  getPlaylistDetailsSuccess,
  getPlaylistDetailsFailed,
} from "../Playlist/actions";

import { PlaylistState, Playlist} from "../../types/playlistTypes";

const initialState: PlaylistState = {
  status: RequestStatus.IDLE,
  playlistCollection: { items: [] },
  playlistTracks: { items: [] },
  selectedPlaylist: null,
  selectedPlaylistId: "",
  error: undefined,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setSelectedPlaylist: (
      state,
      action: PayloadAction<Playlist>
    ) => {
      state.selectedPlaylist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylistRequest, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(createPlaylistSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.playlistCollection.items.push(action.payload);
        state.error = undefined;
      })
      .addCase(createPlaylistFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(setSelectedPlaylist, (state, action) => {
        state.selectedPlaylist = action.payload;
      })
      .addCase(getUserPlaylistsRequest, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(getUserPlaylistsSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.playlistCollection = action.payload;
        state.error = undefined;
      })
      .addCase(getUserPlaylistsFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.playlistCollection = { items: [] };
        state.error = action.payload.message;
      })
      .addCase(getPlaylistDetailsRequest, (state) => {
        state.status = RequestStatus.PENDING;
      })
      .addCase(getPlaylistDetailsSuccess, (state, action) => {
        state.status = RequestStatus.SUCCESS;
        state.selectedPlaylist = action.payload;
        state.error = undefined;
      })
      .addCase(getPlaylistDetailsFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      });
  },
});

export default playlistSlice.reducer;