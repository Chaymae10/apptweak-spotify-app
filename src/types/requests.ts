export enum RequestStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export type ErrorPayload = {
  message: string;
};

export interface AxiosOptions {
  accessToken?: string;
  baseURL?: string;
}

export interface AccessTokenPayload {
  accessToken: string;
}

/////////////////////////////////// User //////////////////////////////////

export interface AuthState {
  accessToken?: string;
  user?: User;
  playlistCollection: PlaylistCollection;
  status: RequestStatus;
  error?: string;
  playlistDetails: Playlist | null;
  playlistTracks: PlaylistTrackCollection;
  selectedPlaylist: Playlist | null;
  selectedPlaylistId: string ;
  searchResults: TrackDetails[];
}

export interface User {
  userId?: string;
  userName?: string;
}


/////////////////////////////////// Playlist //////////////////////////////////

export interface PlaylistCollection {
  items: Playlist[];

}
export interface Playlist {
  userId: string;
  name: string;
  description?: string;
  id?: string;
  tracks?: PlaylistTrackCollection; 
  snapshot_id?: string;
  owner?: PlaylistOwner;
}

export interface PlaylistOwner {
  id: string;
  display_name: string;
}

/////////////////////////////////// Track //////////////////////////////////
export interface PlaylistTrackCollection {
  items: Track[]; // la liste des tracks appartenant à chaque playlist
  total?: number; // le nombre de pistes appartenant à chaque playlist
}

export interface Track {
  added_at: string;
  track: TrackDetails;
}

export interface TrackDetails {
  id: string;
  album: Album;
  artists: Artist[];
  name: string;
  duration_ms: number;
  popularity: number;
  external_urls: ExternalUrls;
  href: string;
  uri: string;
  preview_url: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
  release_date: string;
  total_tracks: number;
  available_markets?: string[];
  uri: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist {
  id: string;
  name: string;
}
