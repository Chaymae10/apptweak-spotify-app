import React, { FC, ReactElement, ChangeEvent, useState } from "react";
import { PlaylistItem } from "../../containers/auth/slice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import "./PlaylistComponent.css";

interface PlaylistListProps {
  playlistList: PlaylistItem[];
}

const PlaylistList: FC<PlaylistListProps> = ({
  playlistList,
}): ReactElement => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const handleChange = (event: any) => {
    setSelectedPlaylist(event.target.value as string);
    console.log("Selected Playlist ID:", event.target.value);
  };

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
          {playlistList.map((playlist) => (
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
