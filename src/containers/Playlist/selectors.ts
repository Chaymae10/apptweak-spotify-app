// playlistSelectors.js
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectPlaylist  = (state: RootState) => state.playlist;

export const playlistSelectors = {
  getPlaylists: createSelector(selectPlaylist , (playlist) => playlist.playlistCollection),
  getSelectedPlaylist: createSelector(selectPlaylist , (playlist) => playlist.selectedPlaylist),
};