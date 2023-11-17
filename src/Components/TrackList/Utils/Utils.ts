// trackSorting.ts
import { Track } from "../../../types/trackTypes";

const sortTracks = (
  tracks: Track[],
  sortBy: string | null,
  selectedArtist: string | null
): Track[] => {
  return tracks
    .filter((item) =>
      selectedArtist
        ? item.track.artists.some((artist) => artist.name === selectedArtist)
        : true
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.track.name.localeCompare(b.track.name);
        case "duration":
          return a.track.duration_ms - b.track.duration_ms;
        case "popularity":
          return b.track.popularity - a.track.popularity;
        case "release_date":
          return (
            new Date(b.track.album.release_date).getTime() -
            new Date(a.track.album.release_date).getTime()
          );
        default:
          return 0;
      }
    });
};

export default sortTracks;
