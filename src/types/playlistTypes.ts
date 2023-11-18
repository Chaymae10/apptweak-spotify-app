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
    description?: string;
  };

  export interface Playlist {
    collaborative: boolean;
    description?: string;
    external_urls: {
      spotify: string;
    };
    followers: {
      total: number;
    };
    id: string;
    images: Image[];
    name: string;
    owner: PlaylistOwner;
    snapshot_id: string;
    tracks: TrackCollection;
    type: string;
    uri: string;
  }
  
  
  export interface PlaylistOwner {
    id: string;
    display_name: string;
  }

  export interface Image {
    url: string;
    width: number;
    height: number;
  }
  
  