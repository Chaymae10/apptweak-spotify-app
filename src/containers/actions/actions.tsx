import { createAction } from "@reduxjs/toolkit";
import { Playlist, PlaylistCollection, PlaylistTrackCollection, User, ErrorPayload } from "../../types/requests";

export const getUser = createAction("auth/getUser");
export const getUserSuccess = createAction<User>("auth/getUserSuccess");
export const getUserFailed = createAction<ErrorPayload>("auth/getUserFailed");

export const createPlaylistRequest = createAction<Playlist>("auth/createPlaylistRequest");

export const getUserPlaylistsRequest = createAction("auth/getUserPlaylistsRequest");
export const getUserPlaylistsSuccess = createAction<PlaylistCollection>("auth/getUserPlaylistsSuccess");
export const getUserPlaylistsFailed = createAction<ErrorPayload>("auth/getUserPlaylistsFailed");

export const fetchPlaylistsRequest = createAction<{ playlistId: string }>("auth/fetchPlaylistsRequest");

export const setDefaultPlaylist = createAction<Playlist | null>('auth/setDefaultPlaylist');

export const getPlaylistDetailsRequest = createAction<{ playlistId: string }>('auth/getPlaylistDetailsRequest');
export const getPlaylistDetailsSuccess = createAction<Playlist>('auth/getPlaylistDetailsSuccess');
export const getPlaylistDetailsFailed = createAction<ErrorPayload>('auth/getPlaylistDetailsFailed');

export const getPlaylistTracksRequest = createAction<{ playlistId: string }>('auth/getPlaylistTracksRequest');
export const getPlaylistTracksSuccess = createAction<PlaylistTrackCollection>('auth/getPlaylistTracksSuccess');
export const getPlaylistTracksFailed = createAction<ErrorPayload>('auth/getPlaylistTracksFailed');


