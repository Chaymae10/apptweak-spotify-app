import React, { FC, ReactElement, useState, useEffect } from "react";
import { getPlaylistDetailsRequest, getPlaylistTracksRequest, setSelectedPlaylist } from "../../containers/actions/actions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "./PlaylistComponent.css";
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from "../../containers/auth/selectors";

const PlaylistList: FC = (): ReactElement => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
  const dispatch = useDispatch();
  const playlists = useSelector(authSelectors.getPlaylists);

  //Function to handle playlist selection change
  const handlePlaylistSelectionChange  = async (event: any) => {
      // Extract the playlist ID from the selected value in the event
    const playlistId = event.target.value as string;
    setSelectedPlaylistId(playlistId);
  
    // Search for the playlist in the array
    const selectedPlaylist = playlists.items.find((playlist) => playlist.id === playlistId);
  
    // Vérification si la playlist a été trouvée
    if (selectedPlaylist) {
      //Use the setSelectedPlaylist action to update the global state of selected playlist
      dispatch(setSelectedPlaylist(selectedPlaylist));

      dispatch(getPlaylistDetailsRequest({ playlistId }));
      dispatch(getPlaylistTracksRequest({ playlistId }));
    }
  };
  
  

  return (
    <div className="playlist-container">
      <FormControl color="success">
        <InputLabel>Select a playlist</InputLabel>
        <Select
          className="select"
          onChange={handlePlaylistSelectionChange}
          label="Select a playlist"
          value={selectedPlaylistId}
        >
          {playlists.items.map((playlist) => (
            <MenuItem key={playlist.id} value={playlist.id}>
              {playlist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PlaylistList;
