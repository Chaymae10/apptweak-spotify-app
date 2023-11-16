import { RequestStatus } from "./requests";

export interface TrackState{
  searchResults: TrackDetails[];
  status: RequestStatus;
  error?: string;
  playlistTracks: TrackCollection;
}

export interface TrackCollection {
    items: Track[];
    total?: number;
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
  