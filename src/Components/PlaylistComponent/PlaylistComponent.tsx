import React, { FC, ReactElement, useState, useEffect } from "react";
import { getPlaylistDetailsRequest, getPlaylistTracksRequest } from "../../containers/actions/actions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "./PlaylistComponent.css";
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from "../../containers/auth/selectors";

const PlaylistList: FC = (): ReactElement => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const dispatch = useDispatch();
  const playlists = useSelector(authSelectors.getPlaylists);

  const handleChange = async (event: any) => {
    const playlistId = event.target.value as string;
    setSelectedPlaylist(playlistId);
    dispatch(getPlaylistDetailsRequest({ playlistId }));
    dispatch(getPlaylistTracksRequest({ playlistId }));
  };

  useEffect(() => {
    if (selectedPlaylist) {
      dispatch(getPlaylistDetailsRequest({ playlistId: selectedPlaylist }));
      dispatch(getPlaylistTracksRequest({ playlistId: selectedPlaylist }));
    }
  }, [dispatch, selectedPlaylist]);

  return (
    <div className="playlist-container">
      <FormControl color="success">
        <InputLabel>Select a playlist</InputLabel>
        <Select
          className="select"
          onChange={handleChange}
          label="Select a playlist"
          value={selectedPlaylist}
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
