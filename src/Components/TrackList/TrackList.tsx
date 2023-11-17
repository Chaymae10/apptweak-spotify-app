import React, { FC, ReactElement, useState, useEffect } from "react";
import List from "@mui/material/List";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";
import TrackComponent from "../TrackComponent/TrackComponent";
import FilteredArtists from "./FilterTracksByArtistNameButton/FilterTracksByArtistNameButton";
import SortMenu from "./SortTracksButton/SortTracksButton";
import { useSelector } from "react-redux";
import { trackSelectors } from "../../containers/Track/selectors";
import sortTracks from "./Utils/Utils";
import "./TrackList.css";
import { playlistSelectors } from "../../containers/Playlist/selectors";

const itemsPerPage = 10;

const TrackList: FC = (): ReactElement => {
  // Retrieve playlist tracks and selected playlist from the Redux store
  const playlistTracks = useSelector(trackSelectors.getPlaylistTracks);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);

  // Local state to manage pagination and filters
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  // Apply sorting and artist filters to the current tracks
  const currentItems = sortTracks(playlistTracks.items, sortBy, selectedArtist);

  // Calculate indices for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Select tracks to display on the current page
  const displayedItems = currentItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalFilteredItems = currentItems.length;

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

  // Handle page change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  // Handle sorting change
  const handleSortChange = (sortBy: string | null) => {
    setSortBy(sortBy);
    setCurrentPage(1); // Reset page to the first when sorting changes
  };

  // Handle artist change
  const handleArtistChange = (artist: string | null) => {
    setSelectedArtist(artist);
    setCurrentPage(1); // Reset page to the first when artist changes
  };

  // Effect to reset filters when the playlist changes
  useEffect(() => {
    setSortBy(null);
    setSelectedArtist(null);
    setCurrentPage(1);
  }, [selectedPlaylist]);

  // Check if there are tracks to display
  const hasTracks = displayedItems.length > 0;
  const hasNoTracks = !hasTracks && totalFilteredItems === 0;

  return (
    <div className="list-tracker">
      {/* No tracks found */}
      {hasNoTracks && (
        <Alert
        icon={false}
        className="alert"
        >
          There are currently no tracks added to this playlist.Don't hesitate to add some!
        </Alert>
      )}

      {/* Filtering by sorting and artist */}
      {hasTracks && <div className="btns-filter">
        <SortMenu onSortChange={handleSortChange} />
        <FilteredArtists
          // Retrieve unique artists from the tracks
          artists={Array.from(
            new Set(
              playlistTracks.items.flatMap((item) => item.track.artists.map(artist => artist.name))
            )
          )}
          selectedArtist={selectedArtist}
          onChange={handleArtistChange}
        />
      </div>}

      {/* Display tracks */}
      {hasTracks && (
        <List>
          {displayedItems.map((playlistItem, index) => (
            <TrackComponent key={index} track={playlistItem.track} />
          ))}
        </List>
      )}

      {/* Display pagination if necessary */}
      {totalPages > 1 && (
        <div
          className="pagination"
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default TrackList;
