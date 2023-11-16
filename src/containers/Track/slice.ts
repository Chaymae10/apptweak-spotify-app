import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../types/requests";
import {getPlaylistTracksSuccess, getPlaylistTracksFailed,
searchTracksByNameFailed, searchTracksByNameSuccess,
clearSearchResults} from "../Track/actions";

import { TrackState } from "../../types/trackTypes";

const initialState: TrackState = {
  status: RequestStatus.IDLE,
  error: undefined,
  searchResults: [],
  playlistTracks: { items: [] },
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
        state.searchResults = [];
      },

  },
  extraReducers: (builder) => {
    builder
    .addCase(getPlaylistTracksSuccess, (state, action) => {
        state.playlistTracks = action.payload;
        state.status = RequestStatus.SUCCESS;
        state.error = undefined;
      })
      .addCase(getPlaylistTracksFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(searchTracksByNameSuccess, (state, action) => {
        state.searchResults = action.payload; 
        state.status = RequestStatus.SUCCESS;
        state.error = undefined;
      }).addCase(searchTracksByNameFailed, (state, action) => {
        state.status = RequestStatus.ERROR;
        state.error = action.payload.message;
      })
      .addCase(clearSearchResults, (state) => {
        state.searchResults = [];
      })
  },
});

export default trackSlice.reducer;