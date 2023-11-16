// trackSelectors.js
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectTrack = (state: RootState) => state.track;

export const trackSelectors = {
  getPlaylistTracks: createSelector(selectTrack, (track) => track.playlistTracks),
  getSearchResults: createSelector(selectTrack, (track) => track.searchResults),
};