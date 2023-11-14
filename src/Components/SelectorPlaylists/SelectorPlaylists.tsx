import React, { FC, ReactElement, useState, useEffect } from "react";
import { getPlaylistDetailsRequest, getPlaylistTracksRequest, setSelectedPlaylist } from "../../containers/actions/actions";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./SelectorPlaylists.css";
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from "../../containers/auth/selectors";

const SelectorPlaylists: FC = (): ReactElement => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const dispatch = useDispatch();
  const playlists = useSelector(authSelectors.getPlaylists);

  const handlePlaylistSelectionChange = async (event: any, value: any) => {
    if (value) {
      const playlistId = value.id;
      setSelectedPlaylistId(playlistId);
  
      const selectedPlaylist = playlists.items.find((playlist) => playlist.id === playlistId);
  
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
        value={playlists.items.find(playlist => playlist.id === selectedPlaylistId) || null}
        options={playlists.items}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField color="success"
            {...params}
            label="Select a playlist"
            variant="outlined"
            fullWidth
          />
        )}
        onChange={handlePlaylistSelectionChange}
        className="select"
      />
    </div>
  );
};

export default SelectorPlaylists;
