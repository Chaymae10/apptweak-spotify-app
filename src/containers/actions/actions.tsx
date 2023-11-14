import { createAction } from "@reduxjs/toolkit";
import { Playlist, PlaylistCollection, PlaylistTrackCollection, User, ErrorPayload, Track, TrackDetails } from "../../types/requests";

export const getUser = createAction("auth/getUser");
export const getUserSuccess = createAction<User>("auth/getUserSuccess");
export const getUserFailed = createAction<ErrorPayload>("auth/getUserFailed");

export const createPlaylistRequest = createAction<Playlist>("auth/createPlaylistRequest");

export const setSelectedPlaylist = createAction<Playlist | null>("auth/setSelectedPlaylist");

export const getUserPlaylistsRequest = createAction("auth/getUserPlaylistsRequest");
export const getUserPlaylistsSuccess = createAction<PlaylistCollection>("auth/getUserPlaylistsSuccess");
export const getUserPlaylistsFailed = createAction<ErrorPayload>("auth/getUserPlaylistsFailed");

export const getPlaylistDetailsRequest = createAction<{ playlistId: string }>('auth/getPlaylistDetailsRequest');
export const getPlaylistDetailsSuccess = createAction<Playlist>('auth/getPlaylistDetailsSuccess');
export const getPlaylistDetailsFailed = createAction<ErrorPayload>('auth/getPlaylistDetailsFailed');

export const getPlaylistTracksRequest = createAction<{ playlistId: string }>('auth/getPlaylistTracksRequest');
export const getPlaylistTracksSuccess = createAction<PlaylistTrackCollection>('auth/getPlaylistTracksSuccess');
export const getPlaylistTracksFailed = createAction<ErrorPayload>('auth/getPlaylistTracksFailed');

export const removeTrackFromPlaylistRequest = createAction<{ playlistId: string; trackURI: string, snapshotId:string }>(
    'auth/removeTrackFromPlaylistRequest'
  );
  export const removeTrackFromPlaylistSuccess = createAction(
    'auth/removeTrackFromPlaylistSuccess'
  );
  export const removeTrackFromPlaylistFailed = createAction<ErrorPayload>(
    'auth/removeTrackFromPlaylistFailed'
  );

  export const searchTracksByNameRequest = createAction(
    'auth/searchTracksByNameRequest',
    (trackName: string) => ({ payload: { trackName } })
  );
  
  export const searchTracksByNameSuccess = createAction(
    'auth/searchTracksByNameSuccess',
    (searchResults: TrackDetails[]) => ({ payload: { searchResults } })
  );
  
  export const searchTracksByNameFailed = createAction(
    'auth/searchTracksByNameFailed',
    (error: any) => ({ payload: { error } })
  );

  export const clearSearchResults = createAction('CLEAR_SEARCH_RESULTS');


