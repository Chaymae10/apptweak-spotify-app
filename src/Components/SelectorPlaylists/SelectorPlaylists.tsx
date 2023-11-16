import React, { FC, ReactElement, useState, useEffect } from "react";
import {
  getPlaylistDetailsRequest,
  setSelectedPlaylist,
} from "../../containers/Playlist/actions";
import { getPlaylistTracksRequest } from "../../containers/Track/actions";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./SelectorPlaylists.css";
import { useDispatch, useSelector } from "react-redux";
import { playlistSelectors } from "../../containers/Playlist/selectors";
import Typography from "@mui/material/Typography";

const SelectorPlaylists: FC = (): ReactElement => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const dispatch = useDispatch();
  const playlists = useSelector(playlistSelectors.getPlaylists);

  const handlePlaylistSelectionChange = async (event: any, value: any) => {
    if (value) {
      const playlistId = value.id;
      setSelectedPlaylistId(playlistId);

      const selectedPlaylist = playlists.items.find(
        (playlist) => playlist.id === playlistId
      );

      if (selectedPlaylist) {
        dispatch(setSelectedPlaylist(selectedPlaylist));
        dispatch(getPlaylistDetailsRequest({ playlistId }));
        dispatch(getPlaylistTracksRequest({ playlistId }));
      }
    }
  };

  return (
    <div className="playlist-container">
      <Autocomplete
        value={
          playlists.items.find(
            (playlist) => playlist.id === selectedPlaylistId
          ) || null
        }
        options={playlists.items}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
             color="secondary"
            {...params}
            label="Select a playlist"
            variant="outlined"
            fullWidth
          />
        )}
        onChange={handlePlaylistSelectionChange}
        className="select"
        noOptionsText={
          <Typography color="textSecondary">No playlists found</Typography>
        }
      />
      
    </div>
  );
};

export default SelectorPlaylists;