import { createAction } from "@reduxjs/toolkit";
import {
  TrackCollection,
  TrackDetails,
} from "../../types/trackTypes";

import { ErrorPayload } from "../../types/requests";

export const getPlaylistTracksRequest = createAction<{ playlistId: string }>(
  "track/getPlaylistTracksRequest"
);
export const getPlaylistTracksSuccess = createAction<TrackCollection>(
  "track/getPlaylistTracksSuccess"
);
export const getPlaylistTracksFailed = createAction<ErrorPayload>(
  "track/getPlaylistTracksFailed"
);

export const removeTrackFromPlaylistRequest = createAction<{
  playlistId: string;
  trackURI: string;
  snapshotId: string;
}>("track/removeTrackFromPlaylistRequest");

export const removeTrackFromPlaylistSuccess = createAction(
  "track/removeTrackFromPlaylistSuccess"
);

export const removeTrackFromPlaylistFailed = createAction<ErrorPayload>(
  "track/removeTrackFromPlaylistFailed"
);

export const searchTracksByNameRequest = createAction<{ trackName: string }>(
  "track/searchTracksByNameRequest"
);

export const searchTracksByNameSuccess = createAction<TrackDetails[]>(
  "track/searchTracksByNameSuccess"
);

export const searchTracksByNameFailed = createAction<ErrorPayload>(
  "track/searchTracksByNameFailed"
);

export const clearSearchResults = createAction("CLEAR_SEARCH_RESULTS");

export const addTrackToPlaylistRequest = createAction<{
  playlistId: string;
  trackURI: string;}>("track/addTrackToPlaylistRequest");
export const addTrackToPlaylistSuccess = createAction("track/addTrackToPlaylistSuccess");
export const addTrackToPlaylistFailed = createAction<ErrorPayload>("track/addTrackToPlaylistFailed");

