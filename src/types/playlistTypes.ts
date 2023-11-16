import { TrackCollection } from "./trackTypes";
import { RequestStatus } from "./requests";

export interface PlaylistState {
    playlistCollection: PlaylistCollection;
    playlistTracks: TrackCollection;
    selectedPlaylist: Playlist | null;
    selectedPlaylistId: string;
    status: RequestStatus;
    error?: string;
  }

  
export interface PlaylistCollection {
    items: Playlist[];
  }

  export interface PlaylistInput  {
    userId: string;
    name: string;
    description: string;
  };

  export interface Playlist {
    id: string;
    userId: string;
    name: string;
    description: string;
    tracks: TrackCollection;
    snapshot_id: string;
    owner: PlaylistOwner;
  }
  
  export interface PlaylistOwner {
    id: string;
    display_name: string;
  }
  