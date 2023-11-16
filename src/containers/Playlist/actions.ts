import { createAction } from "@reduxjs/toolkit";
import { ErrorPayload } from "../../types/requests";
import { Playlist, PlaylistCollection, PlaylistInput } from "../../types/playlistTypes";

export const createPlaylistRequest = createAction<PlaylistInput>("playlist/createPlaylistRequest");
export const createPlaylistSuccess = createAction<Playlist>("playlist/createPlaylistSuccess");
export const createPlaylistFailed = createAction<ErrorPayload>("playlist/createPlaylistFailed");

export const setSelectedPlaylist = createAction<Playlist | null>("playlist/setSelectedPlaylist");

export const getUserPlaylistsRequest = createAction("playlist/getUserPlaylistsRequest");
export const getUserPlaylistsSuccess = createAction<PlaylistCollection>("playlist/getUserPlaylistsSuccess");
export const getUserPlaylistsFailed = createAction<ErrorPayload>("playlist/getUserPlaylistsFailed");

export const getPlaylistDetailsRequest = createAction<{ playlistId: string }>('playlist/getPlaylistDetailsRequest');
export const getPlaylistDetailsSuccess = createAction<Playlist>('playlist/getPlaylistDetailsSuccess');
export const getPlaylistDetailsFailed = createAction<ErrorPayload>('playlist/getPlaylistDetailsFailed');