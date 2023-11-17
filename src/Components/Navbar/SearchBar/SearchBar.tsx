import React, { FC, ReactElement, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  searchTracksByNameRequest,
  clearSearchResults,
} from "../../../containers/Track/actions";
import TrackResult from "./TrackResult/TrackResult";
import SearchIcon from "@mui/icons-material/Search";
import { trackSelectors } from "../../../containers/Track/selectors";
import Typography from "@mui/material/Typography";
import { playlistSelectors } from "../../../containers/Playlist/selectors";
import { addTrackToPlaylistRequest } from "../../../containers/Track/actions";
import { Track, TrackDetails } from "../../../types/trackTypes";
import { useEffect } from "react";
import { authSelectors } from "../../../containers/auth/selectors";
import "./SearchBar.css";

const SearchBarComponent: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const searchResults = useSelector(trackSelectors.getSearchResults);
  const selectedPlaylist = useSelector(playlistSelectors.getSelectedPlaylist);
  const listTracks = useSelector(trackSelectors.getPlaylistTracks);
  const currentUserId = useSelector(authSelectors.getUser)?.userId;
  const [filteredResults, setFilteredResults] = useState<TrackDetails[]>([]);
  const isOwnerPlaylist = selectedPlaylist?.owner?.id === currentUserId;

  // Search handling
  const handleSearchChange = (event: any) => {
    const newSearchTerm = event.target.value;
    if (!newSearchTerm) {
      dispatch(clearSearchResults());
    } else {
      dispatch(searchTracksByNameRequest({ trackName: newSearchTerm }));
    }
  };

  // Handle blur event (e.g., when the input field loses focus)
  const handleBlur = () => {
    dispatch(clearSearchResults());
  };

  // Add a track to the playlist
  const handleAddTrackToPlaylist = (uri: string) => {
    if (selectedPlaylist?.id && selectedPlaylist.tracks) {
      dispatch(
        addTrackToPlaylistRequest({
          playlistId: selectedPlaylist.id,
          trackURI: uri,
        })
      );

      // Update the filtered results by excluding the added track
      setFilteredResults(
        filteredResults.filter((result) => result.uri !== uri)
      );
    }
  };

  // Check if a track is already in the playlist
  const isTrackInPlaylist = (tracks: Track[], uri: string) => {
    return tracks.some((track) => track.track.uri === uri);
  };

  // useEffect to update filtered results when search results or playlist tracks change
  useEffect(() => {
    setFilteredResults(
      searchResults.filter(
        (result) => !isTrackInPlaylist(listTracks.items, result.uri)
      )
    );
  }, [searchResults, listTracks]);

  return (
    <div>
      <Autocomplete
        options={filteredResults}
        getOptionLabel={(track) => track.name}
        noOptionsText={
          <Typography color="textSecondary">No tracks found</Typography>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            onChange={handleSearchChange}
            onBlur={handleBlur}
            className="textField"
            placeholder="Search for a track to add it to the playlist"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <SearchIcon className="searchIcon" />
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: <></>,
            }}
          />
        )}
        renderOption={(props, track) => (
          <TrackResult
            key={track.id}
            trackFound={track}
            handleClick={() => handleAddTrackToPlaylist(track.uri)}
            isOwnerPlaylist={isOwnerPlaylist}
          />
        )}
      />
    </div>
  );
};

export default SearchBarComponent;
